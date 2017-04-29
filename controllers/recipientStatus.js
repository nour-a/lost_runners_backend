const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });
const dbCredentials = require('../config').DB[process.env.NODE_ENV];
const db = pgp(dbCredentials);
const normaliseData = require('../lib/helper');


function selectRunCooByRunId(req,res,next) {
    db.query(`SELECT runs.id,runs.start_time,runs.duration,runs.destination,coordinates.latitude, coordinates.longitude FROM runs INNER JOIN coordinates ON runs.id = coordinates.run_id WHERE run_id = ${req.params.run_id}`)
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

module.exports = {
    selectRunCooByRunId
};