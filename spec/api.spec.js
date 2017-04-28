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
                expect(response.status).to.equal(200);
                expect(response.body.status).to.equal('OK');
                done();
            });
    });
    it('handles incorrect roots', (done) => {
        request(ROOT)
            .get('/incorrectRoot')
            .end((error, response) => {
                expect(response.status).to.equal(404);
                done();
            });
    });
});

describe('GET /runs/:id', () => {
    it('returns a status 200 OK', (done) => {
        request(ROOT)
            .get('/runs/1')
            .end((error, response) => {
                expect(response.status).to.equal(200);
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
                expect(response.status).to.equal(201);
                expect(response.body).to.be.an('object');
                expect(response.body.id).to.be.a('number');
                done();
            });
    });
    it('handles user ids which do not exist', (done) => {
        request(ROOT)
            .post('/runs/1000/start')
            .type('json')
            .send({
                'duration': '40',
                'destination': 'market street',
                'phone_number': '1234456789',
                'name': 'gigi',
                'body': 'HI I AM GOING TO MY RUN on market st'
            })
            .end((error, response) => {
                expect(response.status).to.equal(422);
                expect(response.body).to.be.an('object');
                done();
            });
    });
});

describe(' DELETE/runs/:user_id/end/:run_id', () => {
    it('delete the run and all the info related to this run from all the tables', (done) => {
        request(ROOT)
            .delete('/runs/1/end/1')
            .type('json')
            .end((error, response) => {
                expect(response.status).to.equal(204);
                done();
            });
    });

});


describe(' DELETE /runs/:user_id/end/:run_id', () => {
    it('delete /runs/2/end/90999 will return 404', (done) => {
        request(ROOT)
            .delete('/runs/2/end/90999')
            .end((error, response) => {
                expect(response.status).to.equal(404);
                done();
            });
    });
});