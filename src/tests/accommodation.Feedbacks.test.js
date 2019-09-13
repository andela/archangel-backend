import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import message from '../utils/messageUtils';
import {
  testUser1,
  testFeedback,
  validAccommodationId,
} from './mockData';
import app from '../index';

const prefix = '/api/v1';
const signinRoute = `${prefix}/auth/login`;
const feedbackRoute = `${prefix}/accommodation/${validAccommodationId}/feedback`;

dotenv.config();
chai.use(chaiHttp);

describe('Testing Commenting on Accommodation Facilities', () => {
  let user1AuthToken;

  before((done) => {
    chai
      .request(app)
      .post(signinRoute)
      .send(testUser1)
      .end((err, res) => {
        const { data } = res.body;
        user1AuthToken = data.token;
        done();
      });
  });

  describe('Testing the POST route', () => {
    it('should successfully post a comment/feedback', (done) => {
      chai
        .request(app)
        .post(feedbackRoute)
        .set('Authorization', user1AuthToken)
        .send(testFeedback)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to
            .equal(message.newFeedback(res.body.data.accommodation_name));
          done();
        });
    });
    it('should return an error if the authentication token is invalid', (done) => {
      chai
        .request(app)
        .post(feedbackRoute)
        .set('Authorization', 'Bearer fjdi8553fdfji988ifjf')
        .send(testFeedback)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal(message.invalidToken);
          done();
        });
    });
    it('should return an error if the accommodation does not exist', (done) => {
      chai
        .request(app)
        .post(`${prefix}/accommodation/4556/feedback`)
        .set('Authorization', user1AuthToken)
        .send(testFeedback)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal(message.accommodationNotFound);
          done();
        });
    });
    it('should return an error if the accommodation ID is invalid', (done) => {
      chai
        .request(app)
        .post(`${prefix}/accommodation/455rttr3/feedback`)
        .set('Authorization', user1AuthToken)
        .send(testFeedback)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal(message.invalidAccommodationId);
          done();
        });
    });
    it('should return an error if the feedback field is empty', (done) => {
      const mutatedFeedback = { ...testFeedback };
      mutatedFeedback.feedback = '';
      chai
        .request(app)
        .post(feedbackRoute)
        .set('Authorization', user1AuthToken)
        .send(mutatedFeedback)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal(message.emptyFeedback);
          done();
        });
    });
  });

  describe('Testing the GET route', () => {
    it('should return a list of feedback on an accommodation facility', (done) => {
      chai
        .request(app)
        .get(feedbackRoute)
        .set('Authorization', user1AuthToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.length).to.equal(3);
          done();
        });
    });
    it('should return an error if the accommodation does not exist', (done) => {
      chai
        .request(app)
        .get(`${prefix}/accommodation/911/feedback`)
        .set('Authorization', user1AuthToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal(message.accommodationNotFound);
          done();
        });
    });
  });
});
