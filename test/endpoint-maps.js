'use strict';

const assert = require('assert');
const Biteship = require('../src/biteship.js');

const options = {
  api_key: 'xxx'
}

describe('Endpoint maps test', function () {
  it('maps - retrieve', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('retrieve').maps({ input: 'jakarta selatan' });
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/maps/areas?input=jakarta+selatan&countries=ID&type=single');
    assert.strictEqual(result.method, 'get');
    assert.throws(function () {
      biteship.action('create').maps()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('retrieve').maps('')
    }, Error, 'Error thrown');
  });
});
