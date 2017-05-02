process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const config = require('../config');
const PORT = config.PORT[process.env.NODE_ENV];
const ROOT = `http://localhost:${PORT}/api`;

require('../server');

describe('POST /runs/:run_id/coordinates', () => {
    it('handles updated locations with a status 201', (done) => {
        request(ROOT)
            .post('/runs/1/coordinates')
            .send({
                'latitude':'56.8769',
                'longitude':'70.5679'
            })
            .end((error, response) => {
                expect(response.status).to.equal(201);
                done();
            });
    });
    it('handles unknown run ids', (done) => {
        request(ROOT)
            .post('/runs/100/coordinates')
            .send({
                'latitude':'56.8769',
                'longitude':'30.5679'
            })
            .end((error, response) => {
                expect(response.status).to.equal(422);
                expect(response.body.status).to.eql('Not Found');
                done();
            });
    });
    it('handles unvalid coordinates data types', (done) => {
        request(ROOT)
            .post('/runs/1/coordinates')
            .send({
                'latitude':'dfsdf',
                'longitude':'3.5679'
            })
            .end((error, response) => {
                expect(response.status).to.equal(422);
                expect(response.body.status).to.eql('Not Found');
                done();
            });
    });
});