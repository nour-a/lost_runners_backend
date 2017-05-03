/*process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const config = require('../config');
const PORT = config.PORT[process.env.NODE_ENV];
const ROOT = `http://localhost:${PORT}/api`;

require('../server');
describe('GET runs/:run_id', () => {
    it('returns run info and coordinates by run_id', (done) => {
        request(ROOT)
            .get('/runs/3')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('object');
                done();
            });
    });
});

describe('GET runs/:run_id', () => {
    it('returns a status 422 ', (done) => {
        request(ROOT)
            .get('/runs/100')
            .end((error, response) => {
                expect(response.status).to.equal(422);
                done();
            });
    });
    it('returns a status 422 ', (done) => {
        request(ROOT)
            .get('/runs/100rt')
            .end((error, response) => {
                expect(response.status).to.equal(422);
                done();
            });
    });
});*/