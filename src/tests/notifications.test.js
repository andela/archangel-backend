import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import message from '../utils/messageUtils';
import { testUser1, validNotificationId } from './mockData';
import app from '../index';

const prefix = '/api/v1';
const signinRoute = `${prefix}/auth/login`;
const getANotificationRoute = `${prefix}/notification/${validNotificationId}`;
const getAllNotificationRoute = `${prefix}/notification`;

dotenv.config();
chai.use(chaiHttp);

describe('Testing the Notification endpoint', () => {
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

  describe('Testing the GET all notifications route', () => {
    it('should retrieve all notification to a user', (done) => {
      chai
        .request(app)
        .get(getAllNotificationRoute)
        .set('Authorization', user1AuthToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.length).to.equal(2);
          done();
        });
    });
  });

  describe('Testing the GET one notification route', () => {
    it('should return a list of feedback on an accommodation facility', (done) => {
      chai
        .request(app)
        .get(getANotificationRoute)
        .set('Authorization', user1AuthToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal(message.getANotification);
          done();
        });
    });
    it('should return an error if the notification does not exist', (done) => {
      chai
        .request(app)
        .get(`${prefix}/notification/567675`)
        .set('Authorization', user1AuthToken)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal(message.notificationNotFound);
          done();
        });
    });
    it('should return an error if the notification ID is invalid', (done) => {
      chai
        .request(app)
        .get(`${prefix}/notification/5676754dffd`)
        .set('Authorization', user1AuthToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal(message.invalidNotificationId);
          done();
        });
    });
  });
});
