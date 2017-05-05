const { db } = require('../db.config') ;
function selectRunCooByRunId(req,res,next) {
    db.query(`SELECT runs.id,runs.start_time,runs.duration,runs.destination_latitude,runs.destination_longitude,coordinates.latitude,
    coordinates.longitude,coordinates.coordinate_time AS time
    FROM runs 
    INNER JOIN coordinates ON runs.id = coordinates.run_id 
    WHERE run_id = $1`, [req.params.run_id])
        .then(data => {
            if (data.length === 0) {
                throw {code:422,message:'not exists'};
            }

            const path = data.map(location => {
                return {
                    lat: location.latitude, 
                    lng: location.longitude,
                    time: location.time
                };
            });
            const {id, start_time, duration, destination_latitude, destination_longitude} = data[0];
             res.status(200).send({
                runs: {
                    id,
                    start_time,
                    duration,
                    destination: {
                        lat: destination_latitude,
                        lng: destination_longitude 
                    },
                    path
                }
            });
        })
        .catch(error => {
            console.log(error);
            next(error);
        });

}

module.exports = {
    selectRunCooByRunId
};