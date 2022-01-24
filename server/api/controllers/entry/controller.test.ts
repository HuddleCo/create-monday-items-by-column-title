import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../../..';

describe('Entry', () => {
  xit('should be successful', () =>
    request(Server)
      .post('/api/v1/entry')
      .send({
        mondayBoardId: 'board_id_1',
        mondayDeveloperToken: 'TOKEN',
        name: 'John Smith',
        mondayNameColumn: 'Full Name',
        business: 'CompanyCo',
        mondayBusinessColumn: 'Company',
        email: 'john@companyco.com',
        mondayEmailColumn: 'Email',
        contactNumber: '0412 123 456',
        mondayContactNumberColumn: 'Phone',
        message: 'Hello there!',
      })
      .set({
        'X-CREATE-MONDAY-ITEMS-API-KEY': JSON.parse(
          process.env.CREATE_MONDAY_ITEMS_API_KEYS || '[]'
        )[0],
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
      .set({ 'X-CREATE-MONDAY-ITEMS-API-KEY': '["ABC"]' })
      .expect(401)
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('message')
          .equal('unrecognised X-CREATE-MONDAY-ITEMS-API-KEY token');
      }));
});
