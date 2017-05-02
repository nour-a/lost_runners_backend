if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const PORT = config.PORT[process.env.NODE_ENV];
const apiRoutes = require('./routes/api');

app.use(bodyParser.json());

const myLogger = function (req, res, next) {
    // console.log('LOGGED');
    next();
};

app.use(myLogger);

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`);
});

app.use(function (err, req, res, next) {
    if (err.code === 422) {
        return res.status(422).json({ error: err.message });
    }
    if (err.code === 404) {
        return res.status(404).json({ error: err.message });
    }
    if (err.code === '22P02') {
        return res.status(422).json({ status: 'Not Found' });
    }
    if (err.code === '23503') {
        return res.status(422).send({ status: 'Not Found' });
    }
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(500).json({ error: err });
    next();
});

