'use strict';

const assert = require('assert');
const Biteship = require('../src/biteship.js');

const options = {
  api_key: 'xxx'
}

describe('Endpoint couriers test', function () {
  it('couriers - retrieve', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('retrieve').couriers();
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/couriers');
    assert.strictEqual(result.method, 'get');
    assert.throws(function () {
      biteship.action('create').couriers()
    }, Error, 'Error thrown');
  });
});
