'use strict';

const assert = require('assert');
const Biteship = require('../src/biteship.js');

const options = {
  api_key: 'xxx'
}

describe('Endpoint orders test', function () {
  it('orders - retrieve', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('retrieve').orders(null, 'xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/orders/xxx');
    assert.strictEqual(result.method, 'get');
    assert.throws(function () {
      biteship.action('retrieve').orders()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('retrieve').orders('xxx')
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('add').orders()
    }, Error, 'Error thrown');
  });

  it('orders - create', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('create').orders({}, 'xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/orders');
    assert.strictEqual(result.method, 'post');
    assert.throws(function () {
      biteship.action('create').orders()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('create').orders('')
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('create').orders(1)
    }, Error, 'Error thrown');
  });

  it('orders - delete', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('delete').orders('', 'xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/orders/xxx');
    assert.strictEqual(result.method, 'delete');
    assert.throws(function () {
      biteship.action('delete').orders()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('delete').orders('')
    }, Error, 'Error thrown');
  });

  it('orders - cancel', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('cancel').orders({}, 'xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/orders/xxx/cancel');
    assert.strictEqual(result.method, 'post');
    assert.throws(function () {
      biteship.action('cancel').orders()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('cancel').orders('')
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('cancel').orders(1)
    }, Error, 'Error thrown');
  });

  it('orders - cancellation reasons', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('retrieve').ordersCancellationReasons('en');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/orders/cancellation_reasons?lang=en');
    assert.strictEqual(result.method, 'get');
    assert.throws(function () {
      biteship.action('retrieve').ordersCancellationReasons()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('retrieve').ordersCancellationReasons('')
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('retrieve').ordersCancellationReasons(1);
    }, Error, 'Error thrown');
  });
});
