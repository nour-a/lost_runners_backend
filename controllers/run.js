const { db } = require('../db.config');

// post request to start the run, it will return the run ID
function runStart(req, res, next) {
    let data = {};
    db.task(t => {
        return t.one('INSERT INTO runs(duration, destination, user_id) VALUES ($1, $2, $3) returning id',
            [req.body.duration, req.body.destination, req.params.user_id])
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
