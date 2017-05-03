const router = require('express').Router();
const { runStart, runEnd } = require('../controllers/run');
const { locationsUpdate } = require('../controllers/locationsReceiver');
const { selectRunCooByRunId } = require('../controllers/recipientStatus');

router.route('/')
    .get((req, res) => {
        res.status(200).json({ status: 'OK' });
    });
router.route('/users/:user_id/run')
    .post(runStart);
router.route('/runs/:run_id/coordinates')
    .post(locationsUpdate);
router.route('/runs/:run_id')
    .delete(runEnd);
router.route('/runs/:run_id')
    .get(selectRunCooByRunId);


module.exports = router;
