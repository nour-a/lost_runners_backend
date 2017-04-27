const router = require('express').Router();
const { selectRunsById, runStart } = require('../controllers/run');
const { locationsUpdate } = require('../controllers/locationsReceiver');
const { userRegistration, usersRegistered } = require('../controllers/userRegistration');

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

router.route('/registration')
    .post(userRegistration);

router.route('/users')
    .get(usersRegistered);

module.exports = router;