const router = require('express').Router();
const runController = require('../controllers/run');

router.route('/')
    .get((req, res) => {
        res.status(200).json({status: 'OK'});
    });
    router.route('/runs/:user_id')
    .get(runController.selectRunsById);

    router.route('/runs/:user_id/start')
  .get(runController.selectAllRuns)
  .post(runController.runStart);


    module.exports = router;