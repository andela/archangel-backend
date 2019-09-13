/* eslint-disable prefer-object-spread */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import message from '../utils/messageUtils';
import {
  testUser2,
  testTravelRequest,
  testManager1,
  testManager2,
  validTravelId,
  modifiedTravelRequest
} from './mockData';

import app from '../index';

const prefix = '/api/v1';
const signupRoute = `${prefix}/auth/signup`;
const loginRoute = `${prefix}/auth/login`;
const onewayRoute = `${prefix}/travel/one_way_trip`;
const pendingRequestRoute = `${prefix}/travel/pending`;
const approveRequestRoute = `${prefix}/travel/approve_request/${validTravelId}`;

dotenv.config();

chai.use(chaiHttp);

let token;

describe('Testing one way ticket feature', () => {
  before((done) => {
    chai
      .request(app)
      .post(loginRoute)
      .send(testUser2)
      .end((err, res) => {
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
      .send(testTravelRequest)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return an error if the token is invalid', (done) => {
    chai
      .request(app)
      .post(onewayRoute)
      .send(testTravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return an error if origin is empty', (done) => {
    const mutatedtravelRequest = { ...testTravelRequest };
    mutatedtravelRequest.origin = '';

    chai
      .request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(mutatedtravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to.equal(message.emptyOrigin);
        done();
      });
  });
  it('should return an error message if origin contains integers', (done) => {
    const mutatedtravelRequest = { ...testTravelRequest };
    mutatedtravelRequest.origin = '4Lag12';

    chai
      .request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(mutatedtravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to.equal(message.lettersAlone);
        done();
      });
  });
  it('should return an error message if the destination is empty', (done) => {
    const mutatedtravelRequest = { ...testTravelRequest };
    mutatedtravelRequest.destination = '';

    chai
      .request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(mutatedtravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to.equal(message.emptyDestination);
        done();
      });
  });
  it('should return an error message if the destination contains integers', (done) => {
    const mutatedtravelRequest = { ...testTravelRequest };
    mutatedtravelRequest.destination = '4Kigs23';

    chai
      .request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(mutatedtravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to.equal(message.lettersAlone);
        done();
      });
  });
  it('should return an error message if the departure date is empty', (done) => {
    const mutatedtravelRequest = { ...testTravelRequest };
    mutatedtravelRequest.departure_date = '';

    chai
      .request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(mutatedtravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to.equal(message.emptyDepartureDate);
        done();
      });
  });
  it('should return an error message if travel_purpose', (done) => {
    const mutatedtravelRequest = { ...testTravelRequest };
    mutatedtravelRequest.travel_purpose = '';

    chai
      .request(app)
      .post(onewayRoute)
      .set('Authorization', token)
      .send(mutatedtravelRequest)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to.equal(message.emptyTravelPurpose);
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
    role: 'manager',
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
  it('should return error when role is a manager', (done) => {
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

describe('Testing the travel approval route', () => {
  let managerToken1, managerToken2;

  before((done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/login`)
      .send(testManager1)
      .end((err, res) => {
        const { data } = res.body;
        managerToken1 = data.token;
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/login`)
      .send(testManager2)
      .end((err, res) => {
        const { data } = res.body;
        managerToken2 = data.token;
        done();
      });
  });

  it('should not allow a manager to approve travel in another department', (done) => {
    chai
      .request(app)
      .patch(approveRequestRoute)
      .set('Authorization', managerToken2)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.error).to.equal(message.diffDepartment);
        done();
      });
  });
  it('should successfully approve a travel request', (done) => {
    chai
      .request(app)
      .patch(approveRequestRoute)
      .set('Authorization', managerToken1)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return error if the travel request is not pending', (done) => {
    chai
      .request(app)
      .patch(approveRequestRoute)
      .set('Authorization', managerToken1)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should not allow a normal user to approve a travel request', (done) => {
    chai
      .request(app)
      .patch(approveRequestRoute)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
// Most travelled to destinations

describe('Testing for most travelled destinations', () => {
  it('should successfully return most travelled destination', (done) => {
    chai
      .request(app)
      .get(`${prefix}/most`)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

// Users can edit pending requests
describe('Testing users can edit pending requests', () => {
  it('should successfully edit pending requests', (done) => {
    chai
      .request(app)
      .put(pendingRequestRoute)
      .set('Authorization', token)
      .send(modifiedTravelRequest)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should not edit request if token is not valid', (done) => {
    chai
      .request(app)
      .put(pendingRequestRoute)
      .send(modifiedTravelRequest)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
