process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const config = require('../config');
const PORT = config.PORT[process.env.NODE_ENV];
const ROOT = `http://localhost:${PORT}/api`;

require('../server');
describe ('GET /', () => {
  it ('returns the status ok', (done) => {
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