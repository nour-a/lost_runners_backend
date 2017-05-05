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

});

describe('POST /users/:user_id/run', () => {
    it('adds a new run to the runs table and adds info to messages and recipients tables', (done) => {
        request(ROOT)
            .post('/users/1/run')
            .type('json')
            .send({
                'startLocation': {
                    'latitude': 67.9,
                    'longuitude': 56.2
                },
                'destination': {
                    'latitude': 89.7,
                    'longuitude': 60.4
                },
                'duration': 5676,
                'contacts': ['+447402004093', '+447475120899'],
                'message': 'hi this is my location'
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
            .post('/users/1000/run')
            .type('json')
            .send({
                'startLocation': {
                    'latitude': 67.9,
                    'longuitude': 56.2
                },
                'destination': {
                    'latitude': 89.7,
                    'longuitude': 60.4
                },
                'duration': 5676,
                'contacts': ['+447402004093', '+447475120899'],
                'message': 'hi this is my location'
            })
            .end((error, response) => {
                expect(response.status).to.equal(201);
                expect(response.body).to.be.an('object');
                done();
            });
    });
     it('handles user ids which do not exist', (done) => {
        request(ROOT)
            .post('/users/nour/run')
            .type('json')
            .send({
                'startLocation': {
                    'latitude': 67.9,
                    'longuitude': 56.2
                },
                'destination': {
                    'latitude': 89.7,
                    'longuitude': 60.4
                },
                'duration': 5676,
                'contacts': ['+447402004093', '+447475120899'],
                'message': 'hi this is my location'
            })
            .end((error, response) => {
                expect(response.status).to.equal(201);
                expect(response.body).to.be.an('object');
                done();
            });
    });
});

/* describe(' DELETE/runs/:run_id', () => {
    it('delete the run and all the info related to this run from all the tables', (done) => {
        request(ROOT)
            .delete('/runs/2')
            .type('json')
            .end((error, response) => {
                expect(response.status).to.equal(204);
                done();
            });
    });

});


describe(' DELETE /runs/:run_id', () => {
    it('delete /runs/90999 will return 404', (done) => {
        request(ROOT)
            .delete('/runs/90999')
            .end((error, response) => {
                expect(response.status).to.equal(404);
                done();
            });
    });
    it('delete /runs/909uy will return 404', (done) => {
        request(ROOT)
            .delete('/runs/909uy')
            .end((error, response) => {
                expect(response.status).to.equal(422);
                done();
            });
    });
});*/

