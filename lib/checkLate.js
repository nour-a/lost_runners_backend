const { db } = require('../db.config') ;

function fetchLateRunners () {
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

fetchLateRunners()
    .then(getRecipientInfo)
    .then((runners) => [].concat.apply([],runners))
    .then(console.log);

module.exports = {
    fetchLateRunners,
    getRecipientInfo
};