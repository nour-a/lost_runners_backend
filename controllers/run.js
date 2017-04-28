const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });
const dbCredentials = require('../config').DB[process.env.NODE_ENV];
const db = pgp(dbCredentials);
const { normaliseData } = require('../lib/helper');


// post request returning run ID
function runStart(req, res) {
    let data = {};
    db.task(t => {
        return t.one('SELECT * FROM users WHERE id = $1', [req.params.user_id])
            .then(users => {
               if (!users.id) return;
               return users;
            })
            .then(user => {
                return t.one('INSERT INTO runs(duration, destination, user_id) VALUES ($1, $2, $3) returning id',
                    [req.body.duration, req.body.destination, user.id]);
            })
            .then(({ id: runId }) => {
                data = runId;
                return t.one('INSERT INTO recipients(run_id, phone_number, name) VALUES ($1, $2, $3) returning id',
                    [runId, req.body.phone_number, req.body.name]);
            })
            .then(({ id: recipientId }) => {
                return t.none('INSERT INTO messages(body, recipient_id) VALUES ($1, $2)',
                    [req.body.body, recipientId]);
            });
    })
        .then(() => {
            res.status(201).send({
                id: data
            });
        })
        .catch(error => {
            if (error.message === 'No data returned from the query.') {
                res.status(422).send({status: 'No User Id found'});
            }
        });
}

// Run controller returning all run IDs
function selectRunsById (req, res) {
    db.query(`SELECT * FROM runs WHERE user_id = ${req.params.user_id}`)
        .then(data => {
            res.status(200).send({ 
                runs: normaliseData(data) 
            });

        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = {
    runStart,
    selectRunsById
};
