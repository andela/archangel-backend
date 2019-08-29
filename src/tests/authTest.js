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
});