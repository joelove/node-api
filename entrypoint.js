import supertest from 'supertest';
import { expect } from 'chai';

import app from '../setup';
import Factory from '../factories';

const server = supertest(app.listen());

const existingCompanyFirst = Factory.build('existingCompanyFirst');
const existingCompanySecond = Factory.build('existingCompanySecond');

context('GET /companies', () => {
  let request;

  beforeEach(() => {
    request = server.get('/companies');
  });

  it('responds with 200 OK', done => {
    request.send().expect(200, done);
  });

  it('responds with a list of companies', done => {
    request.send().end((error, res) => {
      const payload = JSON.parse(res.text);
      expect(payload).to.include(existingCompanyFirst);
      expect(payload).to.include(existingCompanySecond);
      expect(payload.length).to.equal(2);
      done();
    });
  });
});
