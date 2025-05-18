'use strict';

const assert = require('assert');
const Biteship = require('../src/biteship.js');

const options = {
  api_key: 'xxx'
}

describe('Endpoint public trackings test', function () {
  it('public trackings - retrieve', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('retrieve').publicTrackings('xxx','yyy');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/trackings/xxx/couriers/yyy');
    assert.strictEqual(result.method, 'get');
    assert.throws(function () {
      biteship.action('retrieve').publicTrackings()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('retrieve').publicTrackings('')
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('retrieve').publicTrackings(1)
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('retrieve').publicTrackings(1, 2)
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('create').publicTrackings()
    }, Error, 'Error thrown');
  });
});
