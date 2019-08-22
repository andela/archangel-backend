import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Testing the authentication endpoints', () => {
    it('should return an error message if the email is invalid', (done) => {
        const userData = {};

        chai.request(app)
        .get('/signup')
        .send(userData)
        .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body.error.message).to.equal('Invalid e-mail address.');
            done();
        });
    });
    it('should return an error message if the email already exists', (done) => {
        const userData = {};

        chai.request(app)
        .get('/signup')
        .send(userData)
        .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body.error.message).to.equal('E-mail already in use.');
            done();
        });
    });
    it('should return an error message if the password length is less than 8', (done) => {
        const userData = {};

        chai.request(app)
        .get('/signup')
        .send(userData)
        .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body.error.message).to
                .equal('Password length must be 8 or more.');
            done();
        });
    });
    it('should return an error message if the password does not contain at least a digit', (done) => {
        const userData = {};

        chai.request(app)
        .get('/signup')
        .send(userData)
        .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body.error.message).to
                .equal('password must contain at least a digit.');
            done();
        });
    });
    it('should return an error message if the first name is empty', (done) => {
        const userData = {};

        chai.request(app)
        .get('/signup')
        .send(userData)
        .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body.error.message).to
                .equal("first name can't be empty.");
            done();
        });
    });
    it('should return an error message if the last name is empty', (done) => {
        const userData = {};

        chai.request(app)
        .get('/signup')
        .send(userData)
        .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body.error.message).to
                .equal("last name can't be empty.");
            done();
        });
    });
});
