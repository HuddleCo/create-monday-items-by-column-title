import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../../..';

describe('Entry', () => {
  it('should create a new entry', () =>
    request(Server)
      .post('/api/v1/entry')
      .send({
        name: 'John Smith',
        business: 'CompanyCo',
        email: 'john@companyco.com',
        contactNumber: '0412 123 456',
        message: 'Hello there!',
        newsletter: 'Subscribe to our newsletter',
      })
      .set({
        'X-STUDIO-BAND-GRAVITY-FORMS-API-KEY':
          process.env.STUDIO_BAND_GRAVITY_FORMS_API_KEY,
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('message')
          .equal('ok');
      }));

  it('should reject unauthorised request', () =>
    request(Server)
      .post('/api/v1/entry')
      .send({})
      .set({ 'X-STUDIO-BAND-GRAVITY-FORMS-API-KEY': 'ABC' })
      .expect(401)
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('message')
          .equal('unrecognised X-STUDIO-BAND-GRAVITY-FORMS-API-KEY token');
      }));
});
