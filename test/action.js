'use strict';

const assert = require('assert');
const Biteship = require('../src/biteship.js');


describe('Biteship action test', function () {

  it('action test', () => {
    const biteship = new Biteship({
      api_key: 'xxx'
    });
    assert.strictEqual(biteship._action, 'retrieve');
    assert.strictEqual(biteship.action('tester')._action, 'tester');
    assert.strictEqual(biteship.action('WelcomE')._action, 'welcome');
    assert.throws(function () {
      biteship.action()
    }, Error, 'Error thrown');
    assert.throws(function () {
      biteship.action(1)
    }, Error, 'Error thrown');
  });
});
