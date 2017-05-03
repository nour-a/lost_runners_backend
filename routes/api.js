const router = require('express').Router();
const { runStart, runEnd } = require('../controllers/run');
const { locationsUpdate } = require('../controllers/locationsReceiver');
const { userRegistration, usersRegistered } = require('../controllers/userRegistration');
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


 router.route('/runs/:run_id/late')
    .get(selectRunCooByRunId);

 router.route('/registration')
 .post(userRegistration);
 router.route('/users')
 .get(usersRegistered);


module.exports = router;
