'use strict';

const assert = require('assert');
const Biteship = require('../src/biteship.js');

const options = {
  api_key: 'xxx'
}

describe('Endpoint trackings test', function () {
  it('trackings - retrieve', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('retrieve').trackings('xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/trackings/xxx');
    assert.strictEqual(result.method, 'get');
    assert.throws(function () {
      biteship.action('retrieve').trackings()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('create').trackings()
    }, Error, 'Error thrown');
  });
});
