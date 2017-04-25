const router = require('express').Router();
const {selectRunsById, selectAllRuns, runStart} = require('../controllers/run');

router.route('/')
    .get((req, res) => {
        res.status(200).json({status: 'OK'});
    });

router.route('/runs/:user_id')
    .get(selectRunsById);

router.route('/runs/:user_id/start')
    .get(selectAllRuns)
    .post(runStart);


module.exports = router;