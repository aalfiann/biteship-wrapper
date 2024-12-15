'use strict';

const assert = require('assert');
const Biteship = require('../src/biteship.js');


describe('Built-in cache test', function () {
  it('cache default variable test', () => {
    const biteship = new Biteship({
      api_key: 'xxx'
    });

    assert.strictEqual(
      biteship.maps({ input: 'jakarta-selatan' }).cache(120)._keycache,
      '472ee57dc2513064540be89956cbcf40e521e4fc496566b6cca5ebb2e729a8ea'
    );
    assert.strictEqual(
      biteship.maps({ input: 'jakarta-selatan' }).cache(120)._ttl,
      120
    );
  });
})
