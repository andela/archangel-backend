/* eslint-disable prefer-object-spread */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import app from '../index';

const prefix = '/api/v1';

dotenv.config();

chai.use(chaiHttp);

describe('Test for the Auth controller functions', () => {
    const user = {
        first_name: 'Emma',
        last_name: 'Korede',
        email: 'emma.k@yahoo.com',
        password: 'testing123',
    };
    it('should successfully sign up a user', (done) => {
        chai
            .request(app)
            .post(`${prefix}/auth/signup`)
            .send(user)
            .end((err, res) => {
                const { data } = res.body;
                expect(res).to.have.status(201);
                expect(data).to.include({
                    first_name: 'Emma',
                    last_name: 'Korede',
                    email: 'emma.k@yahoo.com',
                });
                done();
            });
    });
    it('should return an error message if the email is invalid', (done) => {
		const mutatedUser = Object.assign({}, user);
		mutatedUser.email = 'invalid@yahoo';

		chai.request(app)
        .post(`${prefix}/auth/signup`)
        .send(mutatedUser)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error[0]).to
            .equal('Please, enter a valid email address.');
            done();
        });
    });
    it('should return an error message if the email already exists', (done) => {
        chai.request(app)
        .post(`${prefix}/auth/signup`)
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error[0]).to
            .equal(`User with this email (${user.email}) already exist.`);
            done();
        });
    });
    it('should return an error message if the password length is less than 8', (done) => {
		const mutatedUser = Object.assign({}, user);
		mutatedUser.password = 'test';
		mutatedUser.email = 'valid@yahoo.com';

        chai.request(app)
        .post(`${prefix}/auth/signup`)
        .send(mutatedUser)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error[0]).to
            .equal('The length of the password must be 8 and above.');
            done();
        });
    });
    it('should return an error message if the password does not contain at least a digit', (done) => {
		const mutatedUser = Object.assign({}, user);
		mutatedUser.password = 'testingit';
		mutatedUser.email = 'valid@yahoo.com';

        chai.request(app)
        .post(`${prefix}/auth/signup`)
        .send(mutatedUser)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error[0]).to
            .equal('Password must contain at least one digit.');
            done();
        });
    });
    it('should return an error message if the first name is empty', (done) => {
		const mutatedUser = Object.assign({}, user);
		mutatedUser.first_name = '';
		mutatedUser.email = 'valid@yahoo.com';

        chai.request(app)
        .post(`${prefix}/auth/signup`)
        .send(mutatedUser)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error[0]).to
            .equal('First name cannot be empty.');
            done();
        });
    });
    it('should return an error message if the last name is empty', (done) => {
		const mutatedUser = Object.assign({}, user);
		mutatedUser.last_name = '';
		mutatedUser.email = 'valid@yahoo.com';

        chai.request(app)
        .post(`${prefix}/auth/signup`)
        .send(mutatedUser)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error[0]).to
            .equal('Last name cannot be empty.');
            done();
        });
    });
});
 
describe('Testing logout feature', () => {
    const testuser = {
        first_name: 'Emmatest',
        last_name: 'Koredetest',
        email: 'emmaff.k@yahoo.com',
        password: 'testing321',
    };
    let token;
    before( (done) => {
        chai
        .request(app)
        .post(`${prefix}/auth/signup`)
        .send(testuser)
        .end((err, res) => {
            const { data } = res.body;
            token = data.token;
            done();
        });
    })
    it('should return an error if token is not supplied', (done) => {
        chai.request(app)
        .post(`${prefix}/auth/logout`)
        .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
        });
    });
    it('should return an error if the token is invalid', (done) => {
        chai.request(app)
        .post(`${prefix}/auth/logout`)
        .set("Authorization", "Bearer hjgvju")
        .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
        });
    });
    it('should successfully logout a user', (done) => {
        chai.request(app)
        .post(`${prefix}/auth/logout`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        });
    });
});
