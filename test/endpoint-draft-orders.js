'use strict';

const assert = require('assert');
const Biteship = require('../src/biteship.js');

const options = {
  api_key: 'xxx'
}

describe('Endpoint draft orders test', function () {
  it('draft orders - retrieve', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('retrieve').draftOrders(null, 'xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/draft_orders/xxx');
    assert.strictEqual(result.method, 'get');
    assert.throws(function () {
      biteship.action('retrieve').draftOrders('xxx')
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('retrieve').draftOrders(1)
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('add').draftOrders(null)
    }, Error, 'Error thrown');
  });

  it('draft orders - retrieve rates', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('retrieve').draftOrders(null, 'xxx', '/rates');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/draft_orders/xxx/rates');
    assert.strictEqual(result.method, 'get');
    assert.throws(function () {
      biteship.action('retrieve').draftOrders({})
    }, Error, 'Error thrown');
  });

  it('draft orders - create', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('create').draftOrders({}, 'xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/draft_orders');
    assert.strictEqual(result.method, 'post');
    assert.throws(function () {
      biteship.action('create').draftOrders()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('create').draftOrders('')
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('create').draftOrders(1)
    }, Error, 'Error thrown');
  });

  it('draft orders - update', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('update').draftOrders({}, 'xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/draft_orders/xxx');
    assert.strictEqual(result.method, 'post');
    assert.throws(function () {
      biteship.action('update').draftOrders()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('update').draftOrders('')
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('update').draftOrders('', '')
    }, Error, 'Error thrown');
  });

  it('draft orders - delete', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('delete').draftOrders('', 'xxx');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/draft_orders/xxx');
    assert.strictEqual(result.method, 'delete');
    assert.throws(function () {
      biteship.action('delete').draftOrders()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('delete').draftOrders('')
    }, Error, 'Error thrown');
  });

  it('draft orders - confirm', () => {
    const biteship = new Biteship(options);
    const result = biteship.action('confirm').draftOrders(null, 'xxx', '/confirm');
    assert.strictEqual(result.url, 'https://api.biteship.com/v1/draft_orders/xxx/confirm');
    assert.strictEqual(result.method, 'post');
    assert.throws(function () {
      biteship.action('confirm').draftOrders(null)
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action('confirm').draftOrders(null, '')
    }, Error, 'Error thrown');
  });
});
