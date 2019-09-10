/* eslint-disable prefer-object-spread */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import message from '../utils/messageUtils';

import app from '../index';

const prefix = '/api/v1';
<<<<<<< HEAD
=======
const returnTripRoute = `${prefix}/travel/returntrip`;
const { user } = userData;
const { returnTripTestData } = travelData;
>>>>>>> ft(return-trip-request): implement the function for a user to be able to create a return trip

dotenv.config();

chai.use(chaiHttp);

<<<<<<< HEAD
let token;
const fakeToken = 'ndndddsbdhdddhdhdh';

describe('Testing one way ticket feature', () => {
    const user = {
        first_name: 'thisismyname',
        last_name: 'mylastname',
        email: 'mygmailis@gmail.com',
        password: 'protected123pass',
    };

    const travelRequest = {
        origin: 'Lagos',
        destination: 'Kigali',
        departure_date: '2019-12-12',
        travel_purpose: 'This is a one way trip'
    };


    it('should successfully create a user', (done) => {
        chai
            .request(app)
            .post(`${prefix}/auth/signup`)
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(201);
                const { data } = res.body;
                token = data.token;
                done();
            });
=======
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

    it('Should throw an error if the request body user_id is different from the logged in user', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.user_id = 10;
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(401);
            expect(body.error).to
            .include(message.invalidUserId);
            done(err);
          });
    });

    it('Should throw an error if the request body travel_type is empty or not return-trip', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.travel_type = '';
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(400);
            expect(body.error).to
            .include(message.emptyTravelType);
            done(err);
          });
    });

    it('Should throw an error if the request body origin is empty', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.origin = '';
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(400);
            expect(body.error).to
            .include(message.emptyOrigin);
            done(err);
          });
>>>>>>> ft(return-trip-request): implement the function for a user to be able to create a return trip
    });

    it('should successfully create a one way trip', (done) => {
        chai
            .request(app)
            .post(`${prefix}/onewaytrip`)
            .set('Authorization', `Bearer ${token}`)
            .send(travelRequest)
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
    });

    it('should return an error if the token is invalid', (done) => {
        chai.request(app)
        .post(`${prefix}/onewaytrip`)
        .send(travelRequest)
        .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
        });
    });
<<<<<<< HEAD
    it('should return an error if origin is empty', (done) => {
		const mutatedtravelRequest = Object.assign({}, travelRequest);
		mutatedtravelRequest.origin = '';

		chai.request(app)
        .post(`${prefix}/onewaytrip`)
        .set('Authorization', `Bearer ${token}`)
        .send(mutatedtravelRequest)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error[0]).to
            .equal(message.emptyOrigin);
            done();
        });
=======

    it('Should throw an error if the request body departure_date is not the ISO standard', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.departure_date = '2010-1-02';
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(400);
            expect(body.error).to
            .include(message.isNotISODate);
            done(err);
          });
    });

    it('Should throw an error if the request body departure_date is a past date', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.departure_date = '2010-01-02';
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(400);
            expect(body.error).to
            .equal(message.dateForToday);
            done(err);
          });
>>>>>>> ft(return-trip-request): implement the function for a user to be able to create a return trip
    });
    it('should return an error message if origin contains integers', (done) => {
        const mutatedtravelRequest = Object.assign({}, travelRequest);
		mutatedtravelRequest.origin = '4Lag12';
        chai.request(app)
        .post(`${prefix}/onewaytrip`)
        .set('Authorization', `Bearer ${token}`)
        .send(mutatedtravelRequest)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error[0]).to
            .equal(message.lettersAlone);
            done();
        });
    });
<<<<<<< HEAD
    it('should return an error message if the destination is empty', (done) => {
		const mutatedtravelRequest = Object.assign({}, travelRequest);
		mutatedtravelRequest.destination = '';

        chai.request(app)
        .post(`${prefix}/onewaytrip`)
        .set('Authorization', `Bearer ${token}`)
        .send(mutatedtravelRequest)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error[0]).to
            .equal(message.emptyDestination);
            done();
        });
=======

    it('Should throw an error if the request body return_date is not the ISO standard', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.return_date = '2010-1-02';
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(400);
            expect(body.error).to
            .include(message.isNotISODate);
            done(err);
          });
    });

    it('Should throw an error if the request body return_date is equal to or less than departure_date', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.return_date = returnTripTestData.departure_date;
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(400);
            expect(body.error).to
            .equal(message.dateForFuture);
            done(err);
          });
>>>>>>> ft(return-trip-request): implement the function for a user to be able to create a return trip
    });
    it('should return an error message if the destination contains integers', (done) => {
		const mutatedtravelRequest = Object.assign({}, travelRequest);
		mutatedtravelRequest.destination = '4Kigs23';

        chai.request(app)
        .post(`${prefix}/onewaytrip`)
        .set('Authorization', `Bearer ${token}`)
        .send(mutatedtravelRequest)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error[0]).to
            .equal(message.lettersAlone);
            done();
        });
    });
<<<<<<< HEAD
    it('should return an error message if the departure date is empty', (done) => {
		const mutatedtravelRequest = Object.assign({}, travelRequest);
		mutatedtravelRequest.departure_date = '';

        chai.request(app)
        .post(`${prefix}/onewaytrip`)
        .set('Authorization', `Bearer ${token}`)
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
        .post(`${prefix}/onewaytrip`)
        .set('Authorization', `Bearer ${token}`)
        .send(mutatedtravelRequest)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error[0]).to
            .equal(message.emptyTravelPurpose);
            done();
        });
    });
=======

    it('Should throw an error if the request body accommodation_id is empty', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.accommodation_id = null;
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(400);
            expect(body.error).to
            .include(message.emptyAccommodation);
            done(err);

          });
    });

    it('Should create a new return trip request', (done) =>{
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(returnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(201);
            expect(body.message).to
            .equal(message.returnTripCreated);
            done(err);
          });
    });



  });
>>>>>>> ft(return-trip-request): implement the function for a user to be able to create a return trip
});
