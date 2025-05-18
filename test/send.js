'use strict';

const assert = require('assert');
const Biteship = require('../src/biteship.js');

describe('Biteship send test', function () {
  it('send with wrong api_key should return status 400 (callback based)', () => {
    this.timeout(10000);

    const biteship = new Biteship({
      api_key: 'xxx'
    });
    biteship.action('retrieve').maps({ input: 'jakarta selatan' }).send(function (err, res) {
      if (err) {
        assert.strictEqual(err.status, 400);
        assert.strictEqual(err.success, false);
        assert.strictEqual(err.code, 40000001);
      }
    });
  });

  it('send with payload and wrong api_key should return status 401 (callback based)', async () => {
    this.timeout(10000);

    const biteship = new Biteship({
      api_key: 'xxx'
    });
    const result = biteship.action('create').locations({
      "name":"Apotik Gambir",
      "contact_name":"Ahmad",
      "contact_phone":"08123456789",
      "address":"Jl. Gambir Selatan no 5. Blok F 92. Jakarta Pusat.",
      "note":"Dekat tulisan warung Bu Indah",
      "postal_code":10110,
      "latitude":-6.232123121,
      "longitude":102.22189911,
      "type":"origin",
    }).send(function(err, res) {
      if(err) {
        assert.strictEqual(err.status, 401);
        assert.strictEqual(err.success, false);
        assert.strictEqual(err.code, 40101003);
        return;
      }
      console.log(res);
    });
  });
});
