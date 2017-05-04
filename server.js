if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

// server 
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
const apiRoutes = require('./routes/api');

// server 
app.use(bodyParser.json());

app.use(cors());

// const myLogger = function (req, res, next) {
//   console.log('LOGGED');
//   next();
// };

// app.use(myLogger);

app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, 'public')));

// app.use(function (error, req, res, next) {
//     if (error.code === 422) {
//         return res.status(422).json({error: error.message});
//     }
//     if (error.code === 404) {
//         return res.status(404).json({error: error.message});
//     }
//     next(error);
// });

// app.use(function (error, req, res, next) {
//     res.status(500).json({error: error});
//     next();
// });

// server side render

// app.get('/api', (req, res) => {
//     res.send('OK');
// });

app.get('/*', (req, res) => {
    res.status(404).send({reason: 'not found'});
});

module.exports = app;
