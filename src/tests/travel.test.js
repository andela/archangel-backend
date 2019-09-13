/* eslint-disable prefer-object-spread */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import message from '../utils/messageUtils';
import { returnTripTestData, travelRequest, user } from './mockData';
import app from '../index';

const prefix = '/api/v1';
const signupRoute = `${prefix}/auth/signup`;
const onewayRoute = `${prefix}/travel/one_way_trip`;
const returnTripRoute = `${prefix}/travel/return_trip`;
dotenv.config();

chai.use(chaiHttp);

let token;

describe('TEST FOR TRAVEL REQUEST FUNCTIONS', () => {

  describe('Testing one way ticket feature', () => {

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
        .post(`${prefix}/auth/login`)
        .send(user)
        .end((err, res) => {
          const { body, status } = res;
          expect(body.data).to.not.eql(null);
          expect(status).to.be.eql(200);
          token = body.data.token;
          done(err);
        });
    });

    it('Should throw an error if the request body travel_type is empty or not return-trip', (done) => {
      const mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
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
      const mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
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
      const mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
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
      const mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
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
      const mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
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
      const mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.return_date = returnTripTestData.departure_date;
      chai
        .request(app)
        .post(returnTripRoute)
        .set('Authorization', token)
        .send(mutatedReturnTripTestData)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(400);
          expect(body.error).to
            .equal(message.dateForFuture);
          done(err);
        });
    });

    it('Should throw an error if the request body accommodation_id is empty', (done) => {
      const mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
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
});
