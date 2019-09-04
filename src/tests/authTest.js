import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import app from '../index';
import message from '../utils/messageUtils';

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
	const signupRoute = `${prefix}/auth/signup`;

	it('should successfully sign up a user', (done) => {
		chai
			.request(app)
			.post(signupRoute)
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
	it('should return an error message if the email is empty', (done) => {
		const mutatedUser = { ...user };
		delete mutatedUser.email;

		chai
			.request(app)
			.post(signupRoute)
			.send(mutatedUser)
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error[0]).to.equal(message.emptyEmail);
				done();
			});
	});
	it('should return an error message if the email is invalid', (done) => {
		const mutatedUser = { ...user };
		mutatedUser.email = 'invalid@yahoo';

		chai
			.request(app)
			.post(signupRoute)
			.send(mutatedUser)
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error[0]).to.equal(message.invalidEmail);
				done();
			});
	});
	it('should return an error message if the email already exists', (done) => {
		chai
			.request(app)
			.post(signupRoute)
			.send(user)
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error[0]).to.equal(message.usedEmail(user.email));
				done();
			});
	});
	it('should return an error message if the password length is less than 8', (done) => {
		const mutatedUser = { ...user };
		mutatedUser.password = 'test';
		mutatedUser.email = 'valid@yahoo.com';

		chai
			.request(app)
			.post(signupRoute)
			.send(mutatedUser)
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error[0]).to.equal(message.shortPassword);
				done();
			});
	});
	it('should return an error message if the password does not contain at least a digit', (done) => {
		const mutatedUser = { ...user };
		mutatedUser.password = 'testingit';
		mutatedUser.email = 'valid@yahoo.com';

		chai
			.request(app)
			.post(signupRoute)
			.send(mutatedUser)
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error[0]).to.equal(message.noDigitInPassword);
				done();
			});
	});
	it('should return an error message if the first name is empty', (done) => {
		const mutatedUser = { ...user };
		mutatedUser.first_name = '';
		mutatedUser.email = 'valid@yahoo.com';

		chai
			.request(app)
			.post(signupRoute)
			.send(mutatedUser)
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error[0]).to.equal(message.emptyFirstname);
				done();
			});
	});
	it('should return an error message if the last name is empty', (done) => {
		const mutatedUser = { ...user };
		mutatedUser.last_name = '';
		mutatedUser.email = 'valid@yahoo.com';

		chai
			.request(app)
			.post(signupRoute)
			.send(mutatedUser)
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error[0]).to.equal(message.emptyLastname);
				done();
			});
	});

	// This is the tests that will run for the user signin with username and password..
	describe('TEST USER LOGIN ROUTE', () => {
		const signinRoute = `${prefix}/auth/login`;

		const loginData = {
			email: 'emma.k@yahoo.com',
			password: 'testing123',
		};

		it('should throw an error with a status of 400 if the email supplied is invalid', (done) => {
			const invalidData = { ...loginData };
			invalidData.email = 'invalidemail';

			chai
				.request(app)
				.post(`${prefix}/auth/login`)
				.send(invalidData)
				.end((err, res) => {
					const { body, status } = res;
					expect(status).to.equal(400);
					expect(body.error[0]).to.equal(message.invalidEmail);
					done();
				});
		});

		it('should throw an error with a status of 404 if the email supplied does not exist', (done) => {
			const invalidData = { ...loginData };
			invalidData.email = 'testerroremail@yahoo.com';

			chai
				.request(app)
				.post(signinRoute)
				.send(invalidData)
				.end((err, res) => {
					const { status } = res;
					expect(status).to.be.eql(404);
					done(err);
				});
		});

		it('should return an error message if the password length is less than 8', (done) => {
			const invalidData = { ...loginData };
			invalidData.password = 'pwdless';

			chai
				.request(app)
				.post(`${prefix}/auth/login`)
				.send(invalidData)
				.end((err, res) => {
					const { body, status } = res;
					expect(status).to.equal(400);
					expect(body.error[0]).to.equal(message.shortPassword);
					done(err);
				});
		});

		it('should return an error message if the password does not contain at least a digit', (done) => {
			const invalidData = { ...loginData };
			invalidData.password = 'nodigitpwd';

			chai
				.request(app)
				.post(`${prefix}/auth/login`)
				.send(invalidData)
				.end((err, res) => {
					const { body, status } = res;
					expect(status).to.equal(400);
					expect(body.error[0]).to.equal(message.noDigitInPassword);
					done(err);
				});
		});

		it('should throw an error with a status of 400 if the password supplied is wrong', (done) => {
			const invalidData = { ...loginData };
			invalidData.password = 'passw4567';

			chai
				.request(app)
				.post(signinRoute)
				.send(invalidData)
				.end((err, res) => {
					const { body, status } = res;
					expect(status).to.be.eql(400);
					expect(body.error.message).to.equal(message.incorrectPassword);
					done(err);
				});
		});

		it('should authenticate a user with a valid email and password', (done) => {
			chai
				.request(app)
				.post(signinRoute)
				.send(loginData)
				.end((err, res) => {
					const { body, status } = res;
					expect(body.data).to.not.eql(null);
					expect(status).to.be.eql(200);
					done(err);
				});
		});

		it('should contain a token value in its response data object', (done) => {
			chai
				.request(app)
				.post(signinRoute)
				.send(loginData)
				.end((err, res) => {
					const { data } = res.body;
					expect(data).to.have.ownProperty('token');
					done(err);
				});
		});
	});
	// The test for the auth/login by email and password ends here...

	describe('Testing logout feature', () => {
		const testuser = {
			first_name: 'Emmatest',
			last_name: 'Koredetest',
			email: 'emmaff.k@yahoo.com',
			password: 'testing321',
		};
		let authToken;

		before((done) => {
			chai
				.request(app)
				.post(signupRoute)
				.send(testuser)
				.end((err, res) => {
					const { data } = res.body;
					authToken = data.token;
					done();
				});
		});
		it('should return an error if token is not supplied', (done) => {
			chai
				.request(app)
				.post(`${prefix}/auth/logout`)
				.end((err, res) => {
					expect(res.status).to.equal(401);
					done();
				});
		});
		it('should return an error if the token is invalid', (done) => {
			chai
				.request(app)
				.post(`${prefix}/auth/logout`)
				.set('Authorization', 'Bearer hjgvju')
				.end((err, res) => {
					expect(res.status).to.equal(401);
					done();
				});
		});
		it('should successfully logout a user', (done) => {
			chai
				.request(app)
				.post(`${prefix}/auth/logout`)
				.set('Authorization', `Bearer ${authToken}`)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					done();
				});
		});
	});
});
