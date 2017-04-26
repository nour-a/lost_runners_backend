process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const config = require('../config');
const PORT = config.PORT[process.env.NODE_ENV];
const ROOT = `http://localhost:${PORT}/api`;

require('../server');

describe('POST /runs/:user_id/start/:run_id', () => {
    it('handles updated locations with a status 201', (done) => {
        request(ROOT)
            .post('/runs/1/start/3')
            .send({
                'latitude':'56.8769',
                'longitude':'3.5679'
            })
            .end((error, response) => {
                expect(response.status).to.equal(201);
                done();
            });
    });
    it('handles unknown run ids', (done) => {
        request(ROOT)
            .post('/runs/1/start/3000')
            .send({
                'latitude':'56.8769',
                'longitude':'3.5679'
            })
            .end((error, response) => {
                expect(response.status).to.equal(422);
                expect(response.body.status).to.eql('No user ID found');
                done();
            });
    });
});