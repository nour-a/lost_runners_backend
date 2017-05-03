const { db } = require('../db.config');
function late(req, res) {
    db.query('SELECT runs.id,runs.start_time,runs.duration,runs.destination,coordinates.latitude, coordinates.longitude FROM runs INNER JOIN coordinates ON runs.id = coordinates.run_id WHERE run_id = $1', [req.params.run_id])
        .then(data => {
             res.status(200).send({
                data
            });
        })
        .catch(error => {
            console.log(error);
        });

}
module.exports = {
    late
};