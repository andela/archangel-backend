const assert = require('chai').assert;
const testFunction = require('../utils');




describe('Test function', function() {
    it('Test function should return welcome to Barefoot Nomad', function(){
        assert.equal(testFunction(), 'Welcome to Barefoot Nomad!');
    });
});
