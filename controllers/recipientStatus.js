const { db } = require('../db.config') ;
const {normaliseDataById} = require('../lib/helper');
function selectRunCooByRunId(req,res,next) {
    db.query(`SELECT runs.id,runs.start_time,runs.duration,runs.destination_latitude,runs.destination_longitude,coordinates.latitude,
    coordinates.longitude 
    FROM runs 
    INNER JOIN coordinates ON runs.id = coordinates.run_id 
    WHERE run_id = $1`, [req.params.run_id])
        .then(data => {
            if (data.length === 0) {
                throw {code:422,message:'not exists'};
            }
             res.status(200).send({
                runs: normaliseDataById(data)
            });
        })
        .catch(error => {
            next(error);
        });

}

module.exports = {
    selectRunCooByRunId
};