import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

let should = chai.should;
chai.use(chaiHttp);
let server = app;
