// const bluebird = require('bluebird');
// const pgp = require('pg-promise')({ promiseLib: bluebird });
// const dbCredentials = require('../config').DB[process.env.NODE_ENV];
// const db = pgp(dbCredentials);
var db = require('../db.config');
const { normaliseData } = require('../lib/helper');


function selectRunCooByRunId (req, res, next) {
    db.query('SELECT runs.id, runs.start_time, runs.duration, runs.destination, coordinates.coordinate_time, coordinates.longitude, coordinates.latitude FROM runs INNER JOIN coordinates ON runs.id = coordinates.run_id WHERE run_id = $1', 
    [req.params.run_id])
        .then (data => {
            if (data.length === 0) {
                throw {code:422, message:'Run ID does not exist'};
            }
             res.status(200).send({
                runs: normaliseData(data)
            });
        })
        .catch (error => {
            next(error);
        });
}

module.exports = {
    selectRunCooByRunId
};
