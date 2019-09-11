import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import message from '../utils/messageUtils';
import app from '../index';

const prefix = '/api/v1';

dotenv.config();
chai.use(chaiHttp);

describe('Testing Commenting on Travel Request', () => {
	const user = {
		email: 'emma.k@yahoo.com',
		password: 'testing123',
	};
	const comment = {
		comment: 'This is a comment sample.',
	};
	const validTravelId = '1';

	let authToken;

	it('should successfully login a user', (done) => {
		chai
			.request(app)
			.post(`${prefix}/auth/login`)
			.send(user)
			.end((err, res) => {
				expect(res).to.have.status(200);
				const { data } = res.body;
				authToken = data.token;
				done();
			});
	});
	it('should successfully create a comment', (done) => {
		chai
			.request(app)
			.post(`${prefix}/travel/${validTravelId}/comment`)
			.set('Authorization', `${authToken}`)
			.send(comment)
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
			.send(comment)
			.end((err, res) => {
				expect(res).to.have.status(401);
				expect(res.body.error).to.equal(message.invalidToken);
				done();
			});
	});
	it('should return an error if the travel request does not exist', (done) => {
		chai
			.request(app)
			.post(`${prefix}/travel/12/comment`)
			.set('Authorization', `${authToken}`)
			.send(comment)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.equal(message.nonExistentTravel);
				done();
			});
	});
	it('should return an error if the travel ID is invalid', (done) => {
		chai
			.request(app)
			.post(`${prefix}/travel/${validTravelId}ff/comment`)
			.set('Authorization', `${authToken}`)
			.send(comment)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.equal(message.invalidTravelId);
				done();
			});
	});
	it('should return an error if the comment field is empty', (done) => {
		const mutatedComment = { ...comment };
		mutatedComment.comment = '';
		chai
			.request(app)
			.post(`${prefix}/travel/${validTravelId}/comment`)
			.set('Authorization', `${authToken}`)
			.send(mutatedComment)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.error).to.equal(message.emptyComment);
				done();
			});
	});

	it('should return a list of comments on a travel request', (done) => {
		chai
			.request(app)
			.get(`${prefix}/travel/${validTravelId}/comment`)
			.set('Authorization', `${authToken}`)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.data.length).to.equal(1);
				expect(res.body.message).to.equal(message.successComment[1]);
				done();
			});
	});
});
