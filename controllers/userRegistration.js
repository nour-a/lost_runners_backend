const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });
const dbCredentials = require('../config').DB[process.env.NODE_ENV];
const db = pgp(dbCredentials);
const { normaliseData, sortByUsername } = require('../lib/helper');

function userRegistration (req, res, next) {
    db.task(t => {
        return t.any('SELECT DISTINCT username FROM users WHERE username = $1', [req.body.username])
            .then((users) => {
                 users = sortByUsername(users);
                    if (users.hasOwnProperty(req.body.username)) {
                        throw {code: 422, status: 'USERNAME EXISTS!'};
                    } return;
            })
            .then(() => {
                return t.one('INSERT INTO users (username) VALUES ($1) RETURNING id', 
                    [req.body.username]);
            })
            .then((user) => {
                res.status(201).send({
                    user_id: user.id
                });
            })
            .catch(error => {
                next(error);
            });
    });
}

function usersRegistered (req, res, next) {
    db.any('SELECT * FROM users')
        .then(users => {
            res.status(200).send({
                user: normaliseData(users)
            });
        })
        .catch(error => {
            next(error);
        });
}

module.exports = {
    userRegistration,
    usersRegistered
};

