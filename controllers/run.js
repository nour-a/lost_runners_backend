const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });
const dbCredentials = require('../config').DB[process.env.NODE_ENV];
const db = pgp(dbCredentials);
const normaliseData = require('../lib/helper');

// post request returning run IDn bu run id
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
                res.status(422).send({ status: 'No User Id found' });
            }
        });
}

// Run controller returning all run IDs
function selectRunsById(req, res,next) {
    db.query(`SELECT * FROM runs WHERE user_id = ${req.params.user_id}`)
        .then(data => {
            if (data.length === 0) {
                throw {code:422,message:'not exists'};
            }
             res.status(200).send({
                runs: normaliseData(data)
            });
        })
        .catch(error => {
            next(error);
        });
}
// get the run bu run id
function getRunsByRunId(req, res,next) {
    db.query(`SELECT * FROM runs WHERE run_id = ${req.params.run_id}`)
        .then(data => {
            if (data.length === 0) {
                throw {code:422,message:'not exists'};
            }
             res.status(200).send({
                runs: normaliseData(data)
            });
        })
        .catch(error => {
            next(error);
        });
}
// finish run for run_id

function runEnd(req,res,next) {
    
    db.result('DELETE FROM runs WHERE id = $1', [req.params.run_id], r => r.rowCount)
    .then((data) => {
        // data = number of rows that were deleted
        if (data === 0) {
             throw { code: 404, message:'not found'};
            }
        res.status(204).send();
    })
    .catch(error => {
        next(error);
    });
}
function getMessages(req, res) {
    db.any('SELECT * FROM messages')
        .then(messages => {
            res.status(200).send(messages);
        });
}
function getRuns(req, res) {
    db.any('SELECT * FROM runs')
        .then(runs => {
            res.status(200).send(runs);
        });
}


module.exports = {
    runStart,
    selectRunsById,
    runEnd,
    getMessages,
    getRuns,
    getRunsByRunId
};