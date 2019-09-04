/* eslint-disable prefer-object-spread */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import app from '../index';

const prefix = '/api/v1';

let passwordUserId;
const passwordResetToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU2NzUzNzkwNSwiZXhwIjoxNTY3NTQxNTA1fQ.nPMaVY0-y_FhF9eVroUIe08PXW9kqnmmqUvAcu8uD74'


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


            

    it('should return an error message if the email is empty', (done) => {
		const mutatedUser = Object.assign({}, user);
		delete mutatedUser.email;

		chai.request(app)
        .post(`${prefix}/auth/signup`)
        .send(mutatedUser)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error[0]).to
            .equal('Email cannot be empty.');
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









describe('Testing logout feature', () => {
   
    //This is the tests that will run for the user signin with username and password..
    describe('TEST USER LOGIN ROUTE', () => {
      var signinRoute = `${prefix}/auth/login`;

      const loginData = {
        email: 'emma.k@yahoo.com',
        password: 'testing123'
      };

      it('should throw an error with a status of 400 if the email supplied is invalid', (done) => {
      let invalidData = Object.assign({}, loginData);
      invalidData.email = 'invalidemail';

      chai.request(app)
          .post(`${prefix}/auth/login`)
          .send(invalidData)
          .end((err, res) => {
              const { body, status} = res;
              expect(status).to.equal(400);
              expect(body.error[0]).to
              .equal('Please, enter a valid email address.');
              done();
          });
      });

      it('should throw an error with a status of 404 if the email supplied does not exist', (done) => {
        let invalidData = Object.assign({}, loginData);
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
        let invalidData = Object.assign({}, loginData);
        invalidData.password = 'pwdless';

          chai.request(app)
          .post(`${prefix}/auth/login`)
          .send(invalidData)
          .end((err, res) => {
              const { body, status} = res;
              expect(status).to.equal(400);
              expect(body.error[0]).to
              .equal('The length of the password must be 8 and above.');
              done(err);
          });
      });

      it('should return an error message if the password does not contain at least a digit', (done) => {
        let invalidData = Object.assign({}, loginData);
        invalidData.password = 'nodigitpwd';

          chai.request(app)
          .post(`${prefix}/auth/login`)
          .send(invalidData)
          .end((err, res) => {
            const { body, status} = res;
              expect(status).to.equal(400);
              expect(body.error[0]).to
              .equal('Password must contain at least one digit.');
              done(err);
          });
      });

      it('should throw an error with a status of 400 if the password supplied is wrong', (done) => {
        let invalidData = Object.assign({}, loginData);
        invalidData.password = 'passw4567';

        chai
        .request(app)
        .post(signinRoute)
        .send(invalidData)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.be.eql(400);
          expect(body.error.message).to
          .equal('Sorry, the password entered is not correct.');
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

        chai.request(app)
        .post(signinRoute)
        .send(loginData)
        .end((err, res) => {
          const { data } = res.body;
          expect(data).to.have.ownProperty('token');
          done(err);
        });
      });
    });
    //The test for the auth/login by email and paswword ends here...


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
});


describe('Send Password Reset', () => {
    const testuser = {
        first_name: 'Temi',
        last_name: 'Bakar',
        email: 'bakaretemitayo7@gmail.com',
        password: 'testing321',
    };
    let email;
    before( (done) => {
        chai
        .request(app)
        .post(`${prefix}/auth/signup`)
        .send(testuser)
        .end((err, res) => {
            const { data } = res.body;
            email = data.email;
            passwordUserId = data.id
            done();
        });
    })
    it('it should send token for resetting password',(done) => {
        let user_email = {'email':email}
        chai.request(app)
        .post(`${prefix}/forgot`)
        .send(user_email)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            expect(user_email).to.have.property('email');
            done();
        });
        });


        it('it should reset password via password reset link', (done) => {
            const passwordResetData = {passwordUserId,passwordResetToken}
            chai.request(app)
              .post(`${prefix}/receive_new_password/${passwordUserId}/${passwordResetToken}`)
              .send(passwordResetData)
              .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(passwordResetData).to.have.property('userId');
                expect(passwordResetData).to.have.property('token');
                done();
                 });
              });

});