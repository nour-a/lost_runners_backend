if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const PORT = config.PORT[process.env.NODE_ENV];
const apiRoutes = require('./routes/api');

app.use(bodyParser.json());

const myLogger = function (req, res, next) {
  console.log('LOGGED');
  console.log(req.body);
  next();
};

app.use(myLogger);

app.use('/api', apiRoutes);

app.listen (PORT, () => {
    console.log(`Listening on port: ${PORT}...`);
});

app.use((error, req, res, next) => {
    if (error.code === 404) {
        return res.status(404).send({error: error.message});
    }
    if (error.code === 422) {
        return res.status(422).send({error: error.message});
    }
    next(error);
});

app.use((error, req, res, next) => {
    res.status(500).send({error: error.message});
    next();
});