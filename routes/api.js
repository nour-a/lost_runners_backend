const router = require('express').Router();
const { selectRunsById, runStart, runEnd, getMessages, getRuns, getRunsByRunId  } = require('../controllers/run');
const { locationsUpdate } = require('../controllers/locationsReceiver');

router.route('/')
    .get((req, res) => {
        res.status(200).json({ status: 'OK' });
    });

router.route('/runs/:user_id')
    .get(selectRunsById);
router.route('/runs')
    .get(getRuns);

router.route('/messages')
    .get(getMessages);

router.route('/runs/:user_id/start')
    .post(runStart);

router.route('/runs/:user_id/start/:run_id')
    .get(getRunsByRunId)
    .post(locationsUpdate);
router.route('/runs/:user_id/end/:run_id')
    .delete(runEnd);

module.exports = router;