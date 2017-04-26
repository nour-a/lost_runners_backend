const router = require('express').Router();
const { selectRunsById, runStart } = require('../controllers/run');
const { locationsUpdate } = require('../controllers/locationsReceiver');

router.route('/')
    .get((req, res) => {
        res.status(200).json({status: 'OK'});
    });

router.route('/runs/:user_id')
    .get(selectRunsById);

router.route('/runs/:user_id/start')
    .post(runStart);

router.route('/runs/:user_id/start/:run_id')
    .post(locationsUpdate);


module.exports = router;