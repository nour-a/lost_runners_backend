// const bluebird = require('bluebird');
// const pgp = require('pg-promise')({ promiseLib: bluebird });
// const dbCredentials = require('../config').DB[process.env.NODE_ENV];
// const db = pgp(dbCredentials);
var db = require('../db.config');

function locationsUpdate (req, res) {
    db.task(t => {
        return t.one(`SELECT id FROM runs WHERE id = ${req.params.run_id}`)
            .then(run => {
               if (!run.id) return;
               return run;
            })
            .then(runner => {
                return t.none('INSERT INTO coordinates (run_id, latitude, longitude) VALUES ($1, $2, $3)', 
                [runner.id, req.body.latitude, req.body.longitude]);
            })
            .then(() => {
                res.status(201).send({});
            })
            .catch(error => {
                if (error.message === 'No data returned from the query.') {
                    res.status(422).send({ status: 'No user ID found' });
                }
            });
    });
}

module.exports = {
    locationsUpdate
};