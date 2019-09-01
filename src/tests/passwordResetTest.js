import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { should, expect } = chai;
should();

chai.use(chaiHttp);

const server = app;

const prefix = '/api/users';

const userId = 1215739
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMTU3MzksImlhdCI6MTU2NzI4NDcwNywiZXhwIjoxNTY3Mjg4MzA3fQ.PqpH5J5FiHgCj4B-6lnHSUv9Hphj1H3fSJ4LwpCfB84';

describe('Send Password Reset', () => {
    describe('/POST token', () => {
        it('it should send token for resetting password', (done) => {
        const email = {'email':'bakaretemitayo7@gmail.com'};
        chai.request(server)
          .post(`${prefix}/forgot`)
          .send(email)
          .end((res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(email).to.have.property('email');
                done();
             });
          });
     });
    });
     describe('Reset Password', () => {
        describe('/POST token', () => {
            it('it should reset password via password reset link', (done) => {
            const passwordResetData = {userId,token}
            chai.request(server)
              .post(`${prefix}/receive_new_password/${userId}/${token}`)
              .send(passwordResetData)
              .end((res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(passwordResetData).to.have.property('userId');
                expect(passwordResetData).to.have.property('token');
                done();
                 });
              });
         });
    });
