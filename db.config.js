var options = {
    // initialization options;
};

const bluebird = require('bluebird');

var pgp = require('pg-promise')({ promiseLib: bluebird });

var cn = 'postgres://username:password@host:port/database';
var db = pgp(cn);

module.exports = {
    pgp, db
};