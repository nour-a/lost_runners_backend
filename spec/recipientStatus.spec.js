process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const config = require('../config');
const PORT = config.PORT[process.env.NODE_ENV];
const ROOT = `http://localhost:${PORT}/api`;

require('../server');

xdescribe('GET /:run_id', () => {
    it('returns run info and coordinates by run_id', (done) => {
        request(ROOT)
            .get('/2')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                done();
            });
    });
});

xdescribe('GET /:run_id', () => {
    it('returns a status 422 ', (done) => {
        request(ROOT)
            .get('/100')
            .end((error, response) => {
                expect(response.status).to.equal(422);
                done();
            });
    });
});