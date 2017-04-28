process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const config = require('../config');
const PORT = config.PORT[process.env.NODE_ENV];
const ROOT = `http://localhost:${PORT}/api`;

require('../server');

describe('GET /users', () => {
    it('returns all users', () => {
        request(ROOT)
            .get('/users')
            .end((err, res) => {
                expect(res.status).to.equal(200);
            });
    });
});