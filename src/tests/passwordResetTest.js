import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';

const prefix = '/api/v1';
let should = chai.should();
dotenv.config();

chai.use(chaiHttp);


const userId = 1215739
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMTU3MzksImlhdCI6MTU2NzI4NDcwNywiZXhwIjoxNTY3Mjg4MzA3fQ.PqpH5J5FiHgCj4B-6lnHSUv9Hphj1H3fSJ4LwpCfB84';


    describe('Send Password Reset', () => {
      const email = {'email':'bakaretemitayo7@gmail.com'};
      it('it should send token for resetting password', (done) => {
          chai
              .request(app)
              .post(`${prefix}/forgot`)
              .send(email)
              .end((err, res) => {
                  const { data } = res.body;
                  expect(res).to.have.status(200);
                  expect(data).to.include({
                      email:"bakaretemitayo7@gmail.com"
                  });
                  done();
              });
      });
    });



    //  describe('Reset Password', () => {
    //         it('it should reset password via password reset link', (done) => {
    //         const passwordResetData = {userId,token}
    //         chai.request(server)
    //           .post(`${prefix}/receive_new_password/${userId}/${token}`)
    //           .send(passwordResetData)
    //           .end((err,res) => {
    //             if (err) done(err);
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             expect(passwordResetData).to.have.property('userId');
    //             expect(passwordResetData).to.have.property('token');
    //             done();
    //              });
    //           });
  
    // });
