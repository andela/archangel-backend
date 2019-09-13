/* eslint-disable prefer-object-spread */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import message from '../utils/messageUtils';
import { travelRequest } from './mockData';
import app from '../index';

const prefix = '/api/v1';
const signupRoute = `${prefix}/auth/signup`;
const onewayRoute = `${prefix}/onewaytrip`;
dotenv.config();

chai.use(chaiHttp);

let token;

describe('Testing one way ticket feature', () => {
  const user = {
    first_name: 'namemy',
    last_name: 'lastnamemy',
    email: 'ismygmail@gmail.com',
    password: 'protected123pass',
  };

  it('should successfully create a user', (done) => {
    chai
      .request(app)
      .post(signupRoute)
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { data } = res.body;
        token = data.token;
        done();
      });
  });

  it('should successfully create a one way trip', (done) => {
    chai
      .request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(travelRequest)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return an error if the token is invalid', (done) => {
    chai.request(app)
      .post(onewayRoute)
      .send(travelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return an error if origin is empty', (done) => {
    const mutatedtravelRequest = Object.assign({}, travelRequest);
    mutatedtravelRequest.origin = '';

    chai.request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(mutatedtravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to
          .equal(message.emptyOrigin);
        done();
      });
  });
  it('should return an error message if origin contains integers', (done) => {
    const mutatedtravelRequest = Object.assign({}, travelRequest);
    mutatedtravelRequest.origin = '4Lag12';
    chai.request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(mutatedtravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to
          .equal(message.lettersAlone);
        done();
      });
  });
  it('should return an error message if the destination is empty', (done) => {
    const mutatedtravelRequest = Object.assign({}, travelRequest);
    mutatedtravelRequest.destination = '';

    chai.request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(mutatedtravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to
          .equal(message.emptyDestination);
        done();
      });
  });
  it('should return an error message if the destination contains integers', (done) => {
    const mutatedtravelRequest = Object.assign({}, travelRequest);
    mutatedtravelRequest.destination = '4Kigs23';

    chai.request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(mutatedtravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to
          .equal(message.lettersAlone);
        done();
      });
  });
  it('should return an error message if the departure date is empty', (done) => {
    const mutatedtravelRequest = Object.assign({}, travelRequest);
    mutatedtravelRequest.departure_date = '';

    chai.request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(mutatedtravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to
          .equal(message.emptyDepartureDate);
        done();
      });
  });
  it('should return an error message if travel_purpose', (done) => {
    const mutatedtravelRequest = Object.assign({}, travelRequest);
    mutatedtravelRequest.travel_purpose = '';

    chai.request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(mutatedtravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to
          .equal(message.emptyTravelPurpose);
        done();
      });
  });
});

// Avail request for approval
let adminToken;

describe('Testing Avail request for approval', () => {
  const adminUser = {
    first_name: 'firstoname',
    last_name: 'mylastnoamep',
    email: 'mygmailisj@gomail.com',
    password: 'protected123pass',
    role: 'admin'
  };

  it('should successfully create an admin user', (done) => {
    chai
      .request(app)
      .post(signupRoute)
      .send(adminUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { data } = res.body;
        adminToken = data.token;
        done();
      });
  });

  it('should successfully return manager pending requests', (done) => {
    chai
      .request(app)
      .get(`${prefix}/requests/pending/Mr. Benchfort`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return an error if requester does not have admin privileges', (done) => {
    chai
      .request(app)
      .get(`${prefix}/requests/pending/Mr. Benchfort`)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

// Get users request status

describe('Testing for users request status', () => {
  it('should successfully return user request status', (done) => {
    chai
      .request(app)
      .get(`${prefix}/user/status`)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return error when role is admin', (done) => {
    chai
      .request(app)
      .get(`${prefix}/user/status`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
