const { db } = require('../db.config') ;

function locationsUpdate (req, res,next) {
    db.query('INSERT INTO coordinates(run_id, latitude, longitude) VALUES ($1, $2, $3)',
    [req.params.run_id, req.body.latitude, req.body.longitude])
            .then(() => {
                res.status(201).send({});
            })
            .catch(error => {
                next(error);
            });
}

module.exports = {
    locationsUpdate
};