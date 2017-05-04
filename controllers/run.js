const { db } = require('../db.config');

// post request to start the run, it will return the run ID
function runStart(req, res, next) {
    let data = {};
    db.tx(t => {
        return t.one('INSERT INTO runs(duration, destination_latitude, destination_longitude, txt) VALUES ($1, $2, $3, $4) returning id',
            [req.body.duration, req.body.destination.latitude, req.body.destination.longitude, req.body.message])
            .then(({ id: runId }) => {
                data = runId;
                const queries = req.body.contacts.map((contact) => {
                    return t.one('INSERT INTO recipients(phone_number) VALUES ($1) returning id', [contact]);
                });
                return t.batch(queries);
            })
            .then((rows) => {
                const newQueries = rows.map((input) => {
                    return t.one('INSERT INTO runs_recipients(run_id, recipient_id) VALUES ($1, $2) returning id',
                        [data, input.id]);

                });
                return t.batch(newQueries);
            })
            .then(() => {
                return t.any('INSERT INTO coordinates(run_id, latitude, longitude) VALUES ($1, $2, $3) returning id',
                    [data, req.body.startLocation.latitude, req.body.startLocation.longitude]);
            });
    })
        .then(() => {
            res.status(201).send({
                id: data
            });
        })
        .catch(error => {
            next(error);
        });
}

// finish the run by using the run_id

function runEnd(req, res, next) {

    db.result('DELETE FROM runs WHERE id = $1', [req.params.run_id], r => r.rowCount)
        .then((data) => {
            // data = number of rows that were deleted
            if (data === 0) {
                throw { code: 404, message: 'Not Found' };
            }
            res.status(204).send();
        })
        .catch(error => {
            next(error);
        });
}

module.exports = {
    runStart,
    runEnd
};
