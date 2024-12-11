'use strict';

const assert = require('assert');
const Biteship = require('../src/biteship.js');

const options = {
  api_key: 'xxx'
}

describe('Endpoint rates test', function () {
  it('rates - retrieve', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('retrieve').rates({});
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/rates/couriers');
    assert.strictEqual(result.method, 'post');
    assert.throws(function () {
      biteship.action('retrieve').rates()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('retrieve').rates('')
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('create').rates('')
    }, Error, 'Error thrown');
  });
});
