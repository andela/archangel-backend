import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import message from '../utils/messageUtils';
import {
  testUser1,
  testUser2,
  testComment,
  validTravelId,
  validCommentId,
} from './mockData';
import app from '../index';

const prefix = '/api/v1';
const signinRoute = `${prefix}/auth/login`;

dotenv.config();
chai.use(chaiHttp);

describe('Testing Commenting on Travel Request', () => {
  let user1AuthToken, user2AuthToken;

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
  before((done) => {
    chai
      .request(app)
      .post(signinRoute)
      .send(testUser2)
      .end((err, res) => {
        const { data } = res.body;
        user2AuthToken = data.token;
        done();
      });
  });

  describe('Testing the POST route', () => {
    it('should successfully create a comment', (done) => {
      chai
        .request(app)
        .post(`${prefix}/travel/${validTravelId}/comment`)
        .set('Authorization', user1AuthToken)
        .send(testComment)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal(message.successComment[0]);
          done();
        });
    });
    it('should return an error if the authentication token is invalid', (done) => {
      chai
        .request(app)
        .post(`${prefix}/travel/${validTravelId}/comment`)
        .set('Authorization', 'Bearer fjdi8553fdfji988ifjf')
        .send(testComment)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal(message.invalidToken);
          done();
        });
    });
    it('should return an error if user is not the travel requester or his/her line manager', (done) => {
      chai
        .request(app)
        .post(`${prefix}/travel/${validTravelId}/comment`)
        .set('Authorization', user2AuthToken)
        .send(testComment)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal(message.unauthorizedAccessToTravel);
          done();
        });
    });
    it('should return an error if the travel request does not exist', (done) => {
      chai
        .request(app)
        .post(`${prefix}/travel/12/comment`)
        .set('Authorization', user1AuthToken)
        .send(testComment)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal(message.travelNotFound);
          done();
        });
    });
    it('should return an error if the travel ID is invalid', (done) => {
      chai
        .request(app)
        .post(`${prefix}/travel/458484ff/comment`)
        .set('Authorization', user1AuthToken)
        .send(testComment)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal(message.invalidTravelId);
          done();
        });
    });
    it('should return an error if the comment field is empty', (done) => {
      const mutatedComment = { ...testComment };
      mutatedComment.comment = '';
      chai
        .request(app)
        .post(`${prefix}/travel/${validTravelId}/comment`)
        .set('Authorization', user1AuthToken)
        .send(mutatedComment)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal(message.emptyComment);
          done();
        });
    });
  });

  describe('Testing the GET route', () => {
    it('should return a list of comments on a travel request', (done) => {
      chai
        .request(app)
        .get(`${prefix}/travel/${validTravelId}/comment`)
        .set('Authorization', user1AuthToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.length).to.equal(3);
          expect(res.body.message).to.equal(message.successComment[1]);
          done();
        });
    });
    it('should return an error if the user is not the travel requester or his/her line manager', (done) => {
      chai
        .request(app)
        .get(`${prefix}/travel/${validTravelId}/comment`)
        .set('Authorization', user2AuthToken)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal(message.unauthorizedAccessToTravel);
          done();
        });
    });
    it('should return an error if the travel request does not exist', (done) => {
      chai
        .request(app)
        .get(`${prefix}/travel/9009980/comment`)
        .set('Authorization', user2AuthToken)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal(message.travelNotFound);
          done();
        });
    });
  });

  describe('Testing the DELETE route', () => {
    it('should return an error if the user is not the author of the comment', (done) => {
      chai
        .request(app)
        .delete(`${prefix}/travel/comment/${validCommentId}`)
        .set('Authorization', user2AuthToken)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal(message.unauthorizedCommentDelete);
          done();
        });
    });
    it('should successfully delete a comment on travel request', (done) => {
      chai
        .request(app)
        .delete(`${prefix}/travel/comment/${validCommentId}`)
        .set('Authorization', user1AuthToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal(message.deleteComment);
          done();
        });
    });
    it('should return an error if the comment does not exist', (done) => {
      chai
        .request(app)
        .delete(`${prefix}/travel/comment/9909909`)
        .set('Authorization', user2AuthToken)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal(message.commentNotFound);
          done();
        });
    });
  });
});
