const router = require('express').Router();

router.route('/')
    .get((req, res) => {
        res.status(200).json({status: 'OK'});
    });


    module.exports = router;