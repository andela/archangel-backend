/* eslint-disable prefer-object-spread */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import message from '../utils/messageUtils';
import {
  testUser1,
  returnTripTestData,
  testUser2,
  testTravelRequest,
  testManager1,
  testManager2,
  validTravelId,
  approvedRequest,
} from './mockData';

import app from '../index';

const prefix = '/api/v1';
const signupRoute = `${prefix}/auth/signup`;
const approveRequestRoute = `${prefix}/travel/approve_request/${validTravelId}`;
const loginRoute = `${prefix}/auth/login`;
const onewayRoute = `${prefix}/travel/one_way_trip`;
const rightUpdateRoute = `${prefix}/travel/update_request/1`;
const wrongUpdateRoute = `${prefix}/travel/update_request/`;
const returnTripRoute = `${prefix}/travel/return_trip`;

dotenv.config();

chai.use(chaiHttp);

let token, token2, approvedReqId;

describe('TEST FOR TRAVEL REQUEST FUNCTIONS', () => {
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
      const mutatedtravelRequest = {...testTravelRequest };
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
      const mutatedtravelRequest = {...testTravelRequest };
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
      const mutatedtravelRequest = {...testTravelRequest };
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
      const mutatedtravelRequest = {...testTravelRequest };
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
      const mutatedtravelRequest = {...testTravelRequest };
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
        const mutatedtravelRequest = {...testTravelRequest };
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

  // return trip route tests starts here.....................
  describe('Test for return trip travel request route', () => {
    it('Should throw an error if the request header does not have authorization token', (done) => {
      chai
        .request(app)
        .post(returnTripRoute)
        .send(returnTripTestData)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done(err);
        });
    });

    it('should authenticate a user with a valid email and password', (done) => {
      chai
        .request(app)
        .post(loginRoute)
        .send(testUser2)
        .end((err, res) => {
          const { body, status } = res;
          expect(body.data).to.not.eql(null);
          expect(status).to.be.eql(200);
          token = body.data.token;
          done(err);
        });
    });

    it('Should throw an error if the request body travel_type is empty or not return-trip', (done) => {
        const mutatedReturnTripTestData = {...returnTripTestData };
        mutatedReturnTripTestData.travel_type = '';
        chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status } = res;
            expect(status).to.equal(400);
            expect(body.error).to
              .include(message.emptyTravelType);
            done(err);
          });
    });

    it('Should throw an error if the request body origin is empty', (done) => {
        const mutatedReturnTripTestData = {...returnTripTestData };
        mutatedReturnTripTestData.origin = '';
        chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status } = res;
            expect(status).to.equal(400);
            expect(body.error).to
              .include(message.emptyOrigin);
            done(err);
          });
    });

    it('Should throw an error if the request body departure_date is not the ISO standard', (done) => {
        const mutatedReturnTripTestData = {...returnTripTestData };
        mutatedReturnTripTestData.departure_date = '2010-1-02';
        chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status } = res;
            expect(status).to.equal(400);
            expect(body.error).to
              .include(message.isNotISODate);
            done(err);
          });
    });

    it('Should throw an error if the request body departure_date is a past date', (done) => {
        const mutatedReturnTripTestData = {...returnTripTestData };
        mutatedReturnTripTestData.departure_date = '2010-01-02';
        chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status } = res;
            expect(status).to.equal(400);
            expect(body.error).to
              .equal(message.dateForToday);
            done(err);
          });
    });

    it('Should throw an error if the request body return_date is not the ISO standard', (done) => {
        const mutatedReturnTripTestData = {...returnTripTestData };
        mutatedReturnTripTestData.return_date = '2010-1-02';
        chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status } = res;
            expect(status).to.equal(400);
            expect(body.error).to
              .include(message.isNotISODate);
            done(err);
          });
    });

    it('Should throw an error if the request body return_date is equal to or less than departure_date', (done) => {
      const mutatedReturnTripTestData = {...returnTripTestData };
      mutatedReturnTripTestData.return_date = returnTripTestData.departure_date;
      chai
        .request(app)
        .post(returnTripRoute)
        .set('Authorization', token)
        .send(mutatedReturnTripTestData)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(400);
          expect(body.error).to.equal(message.dateForFuture);
          done(err);
        });
    });

    it('Should throw an error if the request body accommodation_id is empty', (done) => {
      const mutatedReturnTripTestData = { ...returnTripTestData };
      mutatedReturnTripTestData.accommodation_id = null;
      chai
        .request(app)
        .post(returnTripRoute)
        .set('Authorization', token)
        .send(mutatedReturnTripTestData)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(400);
          expect(body.error).to
            .include(message.emptyAccommodation);
          done(err);
        });
    });

    it('Should create a new return trip request', (done) => {
      chai
        .request(app)
        .post(returnTripRoute)
        .set('Authorization', token)
        .send(returnTripTestData)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(201);
          expect(body.message).to
            .equal(message.returnTripCreated);
          done(err);
        });
    });
  });
  // return trip tests route ends here.................

  // stats trip tests route starts here ----------------
  describe('Testing stats of travel request', () => {
    let userToken;
    before((done) => {
      chai
        .request(app)
        .post(loginRoute)
        .send(testUser1)
        .end((err, res) => {
          const { data } = res.body;
          userToken = data.token;
          done();
        });
    });

    it('should return the count of travel request created by a user', (done) => {
      chai
        .request(app)
        .get(`${prefix}/travel/request_count/1215739?start_date=2019-09-15&end_date=2019-09-18`)
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          const { data } = res.body;
          expect(parseInt(data.count)).to.equal(2);
          done();
        });
    });

    it('should return an error if start date is not defined', (done) => {
      chai
        .request(app)
        .get(`${prefix}/travel/request_count/1215739?end_date=2019-09-17`)
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should return an error if start date is not valid', (done) => {
      chai
        .request(app)
        .get(`${prefix}/travel/request_count/1215739?start_date=2019-08ghahghjas-14&end_date=2019-09-17`)
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should return an error if end date is not valid', (done) => {
      chai
        .request(app)
        .get(`${prefix}/travel/request_count/1215739?start_date=2019-08-14&end_date=2019-hhdshhdsuids09-17`)
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  // stats trip tests route ends here ----------------

  // Avail request for approval
  let adminToken;

  describe('Testing Avail request for approval', () => {
    const adminUser = {
      first_name: 'firstoname',
      last_name: 'mylastnoamep',
      email: 'mygmailisj@gomail.com',
      password: 'protected123pass',
      role: 'manager'
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
        .get(`${prefix}/travel/pending_request/Mr. Benchfort`)
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should return an error if requester does not have admin privileges', (done) => {
      chai
        .request(app)
        .get(`${prefix}/travel/pending_request/Mr. Benchfort`)
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
    it('should return error when role is manager', (done) => {
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

  // Testing travel approval...
  describe('Testing the travel approval route', () => {
    let managerToken1, managerToken2;

    before((done) => {
      chai
        .request(app)
        .post(loginRoute)
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
        .post(loginRoute)
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
    before((done) => {
      chai
        .request(app)
        .post(onewayRoute)
        .set('Authorization', token)
        .send(approvedRequest)
        .end((err, res) => {
          const { data } = res.body;
          approvedReqId = data.id;
          expect(res).to.have.status(201);
          done();
        });
    });

    before((done) => {
      chai
        .request(app)
        .post(loginRoute)
        .send(testUser1)
        .end((err, res) => {
          const { data } = res.body;
          token2 = data.token;
          done();
        });
    });

    it('should successfully edit pending requests', (done) => {
      chai
        .request(app)
        .put(rightUpdateRoute)
        .set('Authorization', token)
        .send(testTravelRequest)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should return an error if token is not valid', (done) => {
      chai
        .request(app)
        .put(rightUpdateRoute)
        .send(testTravelRequest)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should return an error if modifier is not the requester', (done) => {
      chai
        .request(app)
        .put(rightUpdateRoute)
        .set('Authorization', token2)
        .send(testTravelRequest)
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });

    it('should return an error if travel id not specified', (done) => {
      chai
        .request(app)
        .put(wrongUpdateRoute)
        .set('Authorization', token)
        .send(testTravelRequest)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should return an error if request has been approved', (done) => {
      chai
        .request(app)
        .put(`${prefix}/travel/update_request/${approvedReqId}`)
        .set('Authorization', token)
        .send(approvedRequest)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
