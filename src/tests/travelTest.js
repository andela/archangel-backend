/* eslint-disable prefer-object-spread */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import app from '../index';
import message from '../utils/messageUtils';
import userData  from './mockData/userData';
import travelData from './mockData/travelData';

const prefix = '/api/v1';
const returnTripRoute = `${prefix}/travel/returntrip`;
const { userTestModel } = userData;
const { returnTripTestData } = travelData;

dotenv.config();

chai.use(chaiHttp);
let token;

describe('TEST FOR TRAVEL REQUEST FUNCTIONS', () => {
  describe('Test for return trip travel request route', () => {
    it('Should throw an error if the request header does not have authorization token', (done) =>{
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
      .send(userTestModel)
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
      mutatedReturnTripTestData.user_id = 0;
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(400);
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
    });

    it('Should throw an error if the request body destination is empty', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.destination = '';
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(400);
            expect(body.error).to
            .include(message.emptyDestination);
            done(err);
          });
    });

    it('Should throw an error if the request body departure_date is empty', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.departure_date = '';
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(400);
            expect(body.error).to
            .include(message.emptyDepartureDate);
            done(err);
          });
    });

    it('Should throw an error if the request body departure_date is not the current date', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.departure_date = '2020/01/02';
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            console.log(body);
            expect(status).to.equal(400);
            expect(body.error).to
            .include(message.dateForToday);
            done(err);
          });
    });

    it('Should throw an error if the request body return_date is empty', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.return_date = '';
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(400);
            expect(body.error).to
            .include(message.emptyReturnDate);
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
            console.log(body);
            expect(status).to.equal(400);
            expect(body.error).to
            .include(message.dateForFuture);
            done(err);
          });
    });

    it('Should throw an error if the request body travel_purpose is empty', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.travel_purpose = '';
      chai
          .request(app)
          .post(returnTripRoute)
          .set('Authorization', token)
          .send(mutatedReturnTripTestData)
          .end((err, res) => {
            const { body, status} = res;
            expect(status).to.equal(400);
            expect(body.error).to
            .include(message.emptyTravelPurpose);
            done(err);
          });
    });

    it('Should throw an error if the request body accommodation_id is empty', (done) =>{
      let mutatedReturnTripTestData = Object.assign({}, returnTripTestData);
      mutatedReturnTripTestData.accommodation_id = '';
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
            console.log(body);
            expect(status).to.equal(201);
            expect(body).to
            .include(message.success);
            done(err);
          });
    });

  });
});
