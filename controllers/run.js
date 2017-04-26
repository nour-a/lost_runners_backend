const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });
const dbCredentials = require('../config').DB[process.env.NODE_ENV];
const db = pgp(dbCredentials);
const { normaliseData } = require('../lib/helper');

function selectAllRuns(req, res) {
    db.query(`SELECT runs.id,
  runs.duration, 
  runs.destination, 
  runs.start_time, 
  users.username, 
  recipients.name 
  FROM runs 
  JOIN users 
  ON runs.user_id = users.id
  JOIN recipients 
  ON recipients.run_id = runs.id`)
        .then(data => {
            res.status(200).json({
                run: data
            });
        })
        .catch(error => {
            console.log(error);
        });
}

function runStart(req, res) {
    let data = {};
    db.task(t => {
        return t.one(`SELECT * FROM users WHERE id = ${req.params.user_id}`)
            .then(users => {
               if (!users.length) return Promise.reject({ code: 200, message: 'user id does not exist' });
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
                id: normaliseData(data)
            });
        })
        .catch(error => {
            console.log('*****', error);
            if (error.code === 422) {
                res.status(422).send({status: 'User ID has not been found'});
            }
        });
}

function selectRunsById(req, res) {
    db.query(`SELECT * FROM runs WHERE user_id = ${req.params.user_id}`)
        .then(data => {
            res.status(200).send({ runs: normaliseData(data) });
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = {
    selectAllRuns,
    runStart,
    selectRunsById
};