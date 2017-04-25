process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const config = require('../config');
const PORT = config.PORT[process.env.NODE_ENV];
const ROOT = `http://localhost:${PORT}/api`;

require('../server');

describe('GET /', () => {
    it('returns the status ok', (done) => {
        request(ROOT)
            .get('/')
            .end((error, response) => {
                if (error) throw error;
                expect(response.status).to.equal(200);
                expect(response.body.status).to.equal('OK');
                done();
            });
    });
});

describe('POST /runs/:user_id/start', () => {
    it('adds a new run to the runs table and adds info to messages and recipients tables', (done) => {
        request(ROOT)
            .post('/runs/1/start')
            .type('json')
            .send({
                'duration': '40',
                'destination': 'market street',
                'phone_number': '1234456789',
                'name': 'gigi',
                'body': 'HI I AM GOING TO MY RUN on market st'
            })
            .end((error, response) => {
                console.log(response.body);
                if (error) throw error;
                expect(response.status).to.equal(201);
                expect(response.body).to.be.an('object');
                expect(response.body.id).to.be.a('number');
            });
                done();
    });
});