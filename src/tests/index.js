import { assert } from 'chai';
import utils from '../utils';

describe('Test function', () => {
  it('Test function should return welcome to Barefoot Nomad', () => {
    assert.equal(utils.testFunction(), 'Welcome to Barefoot Nomad!');
  });

  it('should confirm that arrow function and object destructurin are working', () => {
    assert.equal(utils.testBabel(), 'babel test property');
  });
});
