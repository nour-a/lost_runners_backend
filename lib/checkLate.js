const { db } = require('../db.config');
const twilioConfig = require('../config').TWILIO[process.env.NODE_ENV];
const client = require('twilio')(twilioConfig.accountSid, twilioConfig.authToken);
var CronJob = require('cron').CronJob;

function startMonitoring() {
    new CronJob('00 * * * * *', function () {
        fetchLateRunners()
            .then(getRecipientInfo)
            .then((runners) => [].concat.apply([], runners))
            .then(recipients => {
                return Promise.all(recipients.map(recipient => sendRecipientMessage(recipient)));
            })
    }, null, true);
}


function fetchLateRunners() {
    return db.any(`SELECT DISTINCT runs.id AS runId FROM runs 
        JOIN runs_recipients ON runs.id = runs_recipients.run_id 
        JOIN recipients ON runs_recipients.recipient_id = recipients.id 
        WHERE ((EXTRACT(EPOCH FROM NOW()) - runs.duration) < (EXTRACT(EPOCH FROM runs.start_time)))`
    );
}

function getRecipientInfo(lateRunners) {
    return db.tx(t => {
        const queries = lateRunners.map((runner) => {
            return t.any(`SELECT runs.id AS id, recipients.phone_number, runs.txt From runs 
            JOIN runs_recipients ON runs.id = runs_recipients.run_id 
            JOIN recipients ON runs_recipients.recipient_id = recipients.id 
            WHERE runs.id=$1`, [runner.runid]);
        });
        return t.batch(queries);
    });
}

function sendRecipientMessage(recipient) {
    return new Promise(function (resolve, reject) {
        client.messages.create({
            to: recipient.phone_number,
            from: twilioConfig.fromNumber,
            body: recipient.txt + 'Find me @ https://lost-runner.herokuapp.com/runs/' + recipient.id,
        }, function (err) {
            if (err) {
                return reject(err);
            }
            resolve(recipient);
        });

    });

}

module.exports = {
    startMonitoring
};
