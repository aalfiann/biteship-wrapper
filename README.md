# biteship-wrapper
![Types](https://img.shields.io/npm/types/biteship-wrapper)
[![npm version](https://img.shields.io/npm/v/biteship-wrapper.svg?style=flat-square)](https://www.npmjs.org/package/biteship-wrapper)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/aalfiann/biteship-wrapper/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/aalfiann/biteship-wrapper/tree/main)
[![Known Vulnerabilities](https://snyk.io//test/github/aalfiann/biteship-wrapper/badge.svg?targetFile=package.json)](https://snyk.io//test/github/aalfiann/biteship-wrapper?targetFile=package.json)
![NPM download/month](https://img.shields.io/npm/dm/biteship-wrapper.svg)
![NPM download total](https://img.shields.io/npm/dt/biteship-wrapper.svg)  
Biteship API wrapper library for NodeJS

## Features
- Async Await or Promise Support
- Typescript Support

### Install
```
npm install biteship-wrapper
```

### Usage
This library was created refer to [Biteship API documentation version 1](https://biteship.com/id/docs/intro).  

#### Set Config
```javascript
const Biteship = require('biteship-wrapper');
// or
// import Biteship from 'biteship-wrapper';

const options = {
  api_key: "YOUR_API_KEY"
};

const biteship = new Biteship(options);
```

#### Example to use Maps API

**Using Callback**
```javascript
biteship.action('retrieve').maps({ input: 'jakarta selatan' }).send(function(err, res) {
  if(err) return console.log(err);
  console.log(res);
});
```

**Using Promise**
```javascript
biteship.action('retrieve').maps({ input: 'jakarta selatan' }).sendAsync()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
```

**Using Async Await**
```javascript
try {
  const res = await biteship.action('retrieve').maps({ input: 'jakarta selatan' }).sendAsync();
  console.log(res);
} catch(err) {
  console.log(err);
}
```

### Output Response
Here is the output response standard in Biteship API.

#### Success Response
```json
{
  "status": 200,
  "success": true,
  "message": "",
  "code": 20001007,
  "data": []
}
```
Note:
- `status` could be 2xx or 3xx. 
- `success` always true
- `code` must be a number and its from Biteship.

#### Error Response
```json
{
  "status": 400,
  "success": false,
  "error": "",
  "code": 40000001
}
```

Note:
- `status` could be 4xx or 5xx. 
- `success` always false
- `code` must be a number and its from Biteship.


### Methods
- `action(name: string): this`
- `maps(payload: object): this`
- `rates(payload: object): this`
- `locations(payload?: object | null, id?: string): this`
- `draftOrders(payload?: object | null, id?: string, customPath?: string): this`
- `orders(payload?: object | null, id?: string): this`
- `couriers(): this`
- `trackings(id: string): this`
- `publicTrackings(waybillId: string, courierId: string): this`
- `send(callback: (error: any, response?: any) => void): void`
- `sendAsync(): Promise<{status: number;success: boolean;[key: string]: any;}>`

#### Using Rates API
```javascript
biteship.action('retrieve').rates({
  origin_area_id: "IDNP6IDNC148IDND836IDZ12410",
  destination_area_id: "IDNP6IDNC148IDND836IDZ12430",
  couriers: "paxel,jne,sicepat",
  items: [
    {
      name: "Shoes",
      description: "Black colored size 45",
      value: 199000,
      length: 30,
      width: 15,
      height: 20,
      weight: 200,
      quantity: 2
    }
  ]
}).send(function(err, res) {
  if(err) return console.log(err);
  console.log(res);
});
```

Note:
- Please see the payload [here](https://biteship.com/id/docs/api/rates/retrieve#rates-by-area-id).

#### Using Locations API
**Create**
```javascript
biteship.action('create').locations({
  name: "Apotik Gambir",
  contact_name: "Ahmad",
  contact_phone: "08123456789",
  address: "Jl. Gambir Selatan no 5. Blok F 92. Jakarta Pusat.",
  note: "Dekat tulisan warung Bu Indah",
  postal_code: 10110,
  latitude: -6.232123121,
  longitude: 102.22189911,
  type: "origin",
}).send(function(err, res) {
  if(err) return console.log(err);
  console.log(res);
});
```

Note:
- Please see the payload to create locations [here](https://biteship.com/id/docs/api/locations/create#standard-api-request).

**Retrieve**
```javascript
biteship.action('retrieve').locations(null, '61d565c69a3211036a05f3f8')
  .send(function(err, res) {
    if(err) return console.log(err);
    console.log(res);
});
```

**Update**
```javascript
biteship.action('update').locations({
  name: "Apotik Monas",
}, '61d565c69a3211036a05f3f8').send(function(err, res) {
  if(err) return console.log(err);
  console.log(res);
});
```
Note:
- Please see the payload to update locations [here](https://biteship.com/id/docs/api/locations/update).

**Delete**
```javascript
biteship.action('delete').locations(null, '61d565c69a3211036a05f3f8')
  .send(function(err, res) {
    if(err) return console.log(err);
    console.log(res);
});
```

#### Using Draft Orders API
**Create**
```javascript
biteship.action('create').draftOrders({
  origin_contact_name: "Amir",
  origin_contact_phone: "081234567890",
  origin_address: "Plaza Senayan, Jalan Asia Afrik...",
  origin_note: "Deket pintu masuk STC",
  origin_postal_code: 12440,
  destination_contact_name: "John Doe",
  destination_contact_phone: "088888888888",
  destination_contact_email: "johndoe@example.com",
  destination_address: "Lebak Bulus MRT...",
  destination_postal_code: 12950,
  destination_note: "Near the gas station",
  delivery_type: "now",
  order_note: "Please be careful",
  items: [
    {
      name: "Black L",
      description: "White Shirt",
      category: "fashion",
      value: 165000,
      quantity: 1,
      height: 10,
      length: 10,
      weight: 200,
      width: 10
    }
  ]
}).send(function(err, res) {
  if(err) return console.log(err);
  console.log(res);
});
```
Note:
- Please see the payload to create draft orders [here](https://biteship.com/id/docs/api/draft_orders/create#without-courier).

**Retrieve**
```javascript
biteship.action('retrieve')
  .draftOrders(null, 'ef18275c-02a9-4887-a56b-f374edb96ec4')
  .send(function(err, res) {
    if(err) return console.log(err);
    console.log(res);
});
```

**Retrieve with Rates**
```javascript
biteship.action('retrieve')
  .draftOrders(null, 'ef18275c-02a9-4887-a56b-f374edb96ec4', '/rates')
  .send(function(err, res) {
    if(err) return console.log(err);
    console.log(res);
});
```

**Update**
```javascript
biteship.action('update').draftOrders({
  courier_company: "sicepat",
  courier_type: "reg"
}, 'ef18275c-02a9-4887-a56b-f374edb96ec4')
.send(function(err, res) {
  if(err) return console.log(err);
  console.log(res);
});
```
Note:
- Please see the payload to update draft orders [here](https://biteship.com/id/docs/api/draft_orders/update#set-courier).

**Confirm**
```javascript
biteship.action('confirm')
  .draftOrders(null, 'ef18275c-02a9-4887-a56b-f374edb96ec4', '/confirm')
  .send(function(err, res) {
    if(err) return console.log(err);
    console.log(res);
});
```

**Delete**
```javascript
biteship.action('delete')
  .draftOrders(null, 'ef18275c-02a9-4887-a56b-f374edb96ec4')
  .send(function(err, res) {
    if(err) return console.log(err);
    console.log(res);
});
```

#### Using Orders API
**Create**
```javascript
biteship.action('create').orders({
  shipper_contact_name: "Amir",
  shipper_contact_phone: "088888888888",
  shipper_contact_email: "biteship@test.com",
  shipper_organization: "Biteship Org Test",
  origin_contact_name: "Amir",
  origin_contact_phone: "088888888888",
  origin_address: "Plaza Senayan, Jalan Asia Afrik...",
  origin_note: "Deket pintu masuk STC",
  origin_postal_code: 12440,
  destination_contact_name: "John Doe",
  destination_contact_phone: "088888888888",
  destination_contact_email: "jon@test.com",
  destination_address: "Lebak Bulus MRT...",
  destination_postal_code: 12950,
  destination_note: "Near the gas station",
  courier_company: "jne",
  courier_type: "reg",
  courier_insurance: 500000,
  delivery_type: "now",
  order_note: "Please be careful",
  metadata: {},
  items: [
    {
      name: "Black L",
      description: "White Shirt",
      category: "fashion",
      value: 165000,
      quantity: 1,
      height: 10,
      length: 10,
      weight: 200,
      width: 10
    }
  ]
}).send(function(err, res) {
  if(err) return console.log(err);
  console.log(res);
});
```
Note:
- Please see the payload to create orders [here](https://biteship.com/id/docs/api/orders/create#order-for-standard-couriers).

**Retrieve**
```javascript
biteship.action('retrieve').orders(null, '5dd599ebdefcd4158eb8470b')
  .send(function(err, res) {
    if(err) return console.log(err);
    console.log(res);
});
```

**Delete**
```javascript
biteship.action('delete').orders(null, '5dd599ebdefcd4158eb8470b')
  .send(function(err, res) {
    if(err) return console.log(err);
    console.log(res);
});
```

#### Using Couriers API
**Retrieve**
```javascript
biteship.action('retrieve').couriers()
  .send(function(err, res) {
    if(err) return console.log(err);
    console.log(res);
});
```

#### Using Trackings API
**Retrieve**
```javascript
biteship.action('retrieve').trackings('6051861741a37414e6637fab')
  .send(function(err, res) {
    if(err) return console.log(err);
    console.log(res);
});
```

#### Using Public Trackings API
**Retrieve**
```javascript
biteship.action('retrieve')
  .publicTrackings('0123082100003094', '6051861741a37414e6637fab')
  .send(function(err, res) {
    if(err) return console.log(err);
    console.log(res);
});
```
