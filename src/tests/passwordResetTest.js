import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { should } = chai;
should();

chai.use(chaiHttp);

const server = app;

const prefix = '/api/users';


describe('Send Password Reset', () => {
    describe('/POST token', () => {
        it('it should send token for resetting password', (done) => {
        const email = 'bakaretemitayo7@gmail.com';
        chai.request(server)
          .post(`${prefix}/forgot`)
          .send(email)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('email');
                done();
             });
          });
     });
    });
   //   describe('Reset Password', () => {
   //      describe('/POST token', () => {
   //          it('it should reset password via password reset link', (done) => {
   //          chai.request(server)
   //            .post(`${prefix}/receive_new_password/:userId/:token`)
   //            .end((err, res) => {
   //                  (res).should.have.status(200);
   //                  (res.body).should.be.a('object');
   //                  (res.body).should.have.property('userId');
   //                  (res.body).should.have.property('token');
   //                  done();
   //               });
   //            });
   //       });