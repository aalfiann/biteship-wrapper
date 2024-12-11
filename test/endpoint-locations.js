'use strict';

const assert = require('assert');
const Biteship = require('../src/biteship.js');

const options = {
  api_key: 'xxx'
}

describe('Endpoint locations test', function () {
  it('locations - retrieve', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('retrieve').locations(null, 'xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/locations/xxx');
    assert.strictEqual(result.method, 'get');
    assert.throws(function () {
      biteship.action('retrieve').locations()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('retrieve').locations('xxx')
    }, Error, 'Error thrown');
  });

  it('locations - create', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('create').locations({}, 'xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/locations');
    assert.strictEqual(result.method, 'post');
    assert.throws(function () {
      biteship.action('create').locations()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('create').locations('')
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('create').locations(1)
    }, Error, 'Error thrown');
  });

  it('locations - update', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('update').locations({}, 'xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/locations/xxx');
    assert.strictEqual(result.method, 'post');
    assert.throws(function () {
      biteship.action('update').locations()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('update').locations('')
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('update').locations('', '')
    }, Error, 'Error thrown');
  });

  it('locations - delete', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('delete').locations('', 'xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/locations/xxx');
    assert.strictEqual(result.method, 'delete');
    assert.throws(function () {
      biteship.action('delete').locations()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('delete').locations('')
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('add').locations('')
    }, Error, 'Error thrown');
  });
});
