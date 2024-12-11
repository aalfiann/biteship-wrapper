'use strict';

const assert = require('assert');
const Biteship = require('../src/biteship.js');


describe('Biteship configuration test', function () {
  it('configuration test', () => {
    assert.throws(function () { new Biteship() }, Error, 'Error thrown');
    assert.throws(function () { new Biteship([]) }, Error, 'Error thrown');
    assert.throws(function () { new Biteship('') }, Error, 'Error thrown');
    assert.throws(function () { new Biteship(1) }, Error, 'Error thrown');
    assert.throws(function () { new Biteship({}) }, Error, 'Error thrown');
  });

  it('api_key test', () => {
    const biteship = new Biteship({
      api_key: 'xxx'
    });
    assert.strictEqual(biteship.api_key, 'xxx');
    assert.throws(function () {
      new Biteship({
        api_key: ''
      });
    }, Error, 'Error thrown');
  });

  it('version api test', () => {
    assert.strictEqual(new Biteship({
      api_key: 'xxx'
    }).api_version, 'v1');

    assert.strictEqual(new Biteship({
      api_key: 'xxx',
      api_version: 'v2'
    }).api_version, 'v2');
  });
});
