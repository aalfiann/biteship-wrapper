'use strict';

const crypto = require('crypto');
const axios = require('axios');
const Cacheman = require('recacheman')

class Biteship {
  static baseUrl = 'https://api.biteship.com';

  /**
  * Constructor
  * @param {object} config
  *
  * Note:
  * Example required config
  * {
  *   api_key: "",              [required] you can get it from biteship dashboard.
  *   api_version: "v1"         [optional] default is v1.
  *   cache_config: {           [optional]
  *     namespace: 'biteship',  [required] default is "biteship".
  *     engine: '',             [required] "memory" | "file" | "redis". Default is using memory.
  *   }
  * }
  */
  constructor(config) {
    this._action = 'retrieve';
    if(typeof config === 'object' && config.constructor === Object){
      for(let key in config) {
        if(config.hasOwnProperty(key)) {
          this[key] = config[key];
        }
      }
      if(!this.api_key) {
        throw new Error('An api_key is required!');
      }
      if(!this.api_version) {
        this.api_version = 'v1';
      }
      if(!this.cache_config) {
        this.cache_config = {
          namespace: 'biteship',
          engine: 'memory'
        };
      }
      if(!this.cache_config.namespace) {
        this.cache_config.namespace = 'biteship';
      }
      if(!this.cache_config.engine) {
        this.cache_config.engine = 'memory';
      }
      this.cacheman = new Cacheman(this.cache_config.namespace, this.cache_config);
    } else {
      throw new Error('Config must be an object type!');
    }
  }

  /**
  * Simple Hash with SHA256
  */
  _hash(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
  }

  /**
  * Reset
  */
  _reset() {
    this.url = '';
    this.payload = null;
    this.method = null;
    this._keycache = undefined;
    this._ttl = undefined;
  }

  /**
  * Action name for CRUD
  * @param {string} name    retrieve|create|update|delete|confirm
  * @returns {this}
  */
  action(name) {
    if(!name || typeof name !== 'string') {
      throw new Error('name is required and should be a string!');
    }
    name = name.toLowerCase();
    this._action = name;
    return this;
  }

  /**
  * Maps API
  * @param {object} payload
  * @returns {this}
  */
  maps(payload) {
    this._reset();
    if(this._action !== 'retrieve') {
      throw new Error('Action not available!');
    }

    if(!payload || typeof payload !== 'object') {
      throw new Error('payload is required and should be an object!');
    }

    this.url = Biteship.baseUrl + '/' + this.api_version + '/maps/areas';
    if(!payload.countries) {
      payload.countries = 'ID';
    }
    if(!payload.type) {
      payload.type = 'single';
    }
    const queryString = new URLSearchParams(payload).toString();
    this.url = this.url + '?' + queryString;
    this.method = 'get';
    return this;
  }

  /**
  * Rates API
  * @param {object} payload
  * @returns {this}
  */
  rates(payload) {
    this._reset();
    if(this._action !== 'retrieve') {
      throw new Error('Action not available!');
    }
    if(!payload && typeof payload !== 'object') {
      throw new Error('payload is required and should be an object!');
    }

    this.payload = payload;
    this.url = Biteship.baseUrl + '/' + this.api_version + '/rates/couriers';
    this.method = 'post';

    return this;
  }

  /**
  * Locations API
  * @param {object|null} payload
  * @param {string|null|undefined} id
  * @returns {this}
  */
  locations(payload, id) {
    this._reset();

    id = (id === undefined ? '' : '/' + id);
    payload = (payload === undefined ? null : payload);
    if(payload && typeof payload !== 'object') {
      throw new Error('payload should be an object!');
    }

    switch(this._action) {
      case 'create':
        if(!payload) {
          throw new Error('payload is required!');
        }
        id = '';
        this.method = 'post';
        this.payload = payload;
        break;
      case 'retrieve':
        if(!id) {
          throw new Error('id is required!');
        }
        this.method = 'get';
        break;
      case 'update':
        if(!id || !payload) {
          throw new Error('id and payload is required!');
        }
        this.method = 'post';
        this.payload = payload;
        break;
      case 'delete':
        if(!id) {
          throw new Error('id is required!');
        }
        this.method = 'delete';
        break;
      default:
        throw new Error('Action not available!');
    }
    this.url = Biteship.baseUrl + '/' + this.api_version + '/locations' + id;
    return this;
  }

  /**
  * Draft Orders API
  * @param {object|null} payload
  * @param {string|null|undefined} id
  * @param {string|null|undefined} customPath
  * @returns {this}
  */
  draftOrders(payload, id, customPath) {
    this._reset();
    customPath = (customPath === undefined ? '' : customPath);
    id = (id === undefined ? '' : '/' + id + customPath);
    payload = (payload === undefined ? null : payload);
    if(payload && typeof payload !== 'object') {
      throw new Error('payload should be an object!');
    }

    switch(this._action) {
      case 'create':
        if(!payload) {
          throw new Error('payload is required!');
        }
        id = '';
        this.method = 'post';
        this.payload = payload;
        break;
      case 'retrieve':
        if(!id) {
          throw new Error('id is required!');
        }
        this.method = 'get';
        break;
      case 'update':
        if(!id || !payload) {
          throw new Error('id and payload is required!');
        }
        this.method = 'post';
        this.payload = payload;
        break;
      case 'delete':
        if(!id) {
          throw new Error('id is required!');
        }
        this.method = 'delete';
        break;
      case 'confirm':
        if(!id) {
          throw new Error('id is required!');
        }
        if(!customPath) {
          throw new Error('customPath is required!');
        }
        this.method = 'post';
        break;
      default:
        throw new Error('Action not available!');
    }
    this.url = Biteship.baseUrl + '/' + this.api_version + '/draft_orders' + id;
    return this;
  }

  /**
  * Orders API
  * @param {object|null} payload
  * @param {string|null|undefined} id
  * @returns {this}
  */
  orders(payload, id) {
    this._reset();
    id = (id === undefined ? '' : '/' + id);
    payload = (payload === undefined ? null : payload);
    if(payload && typeof payload !== 'object') {
      throw new Error('payload should be an object!');
    }

    switch(this._action) {
      case 'create':
        if(!payload) {
          throw new Error('payload is required!');
        }
        id = '';
        this.method = 'post';
        this.payload = payload;
        break;
      case 'retrieve':
        if(!id) {
          throw new Error('id is required!');
        }
        this.method = 'get';
        break;
      case 'delete':
        if(!id) {
          throw new Error('id is required!');
        }
        this.method = 'delete';
        break;
      default:
        throw new Error('Action not available!');
    }
    this.url = Biteship.baseUrl + '/' + this.api_version + '/orders' + id;
    return this;
  }

  /**
  * Couriers API
  * @returns {this}
  */
  couriers() {
    this._reset();
    if(this._action !== 'retrieve') {
      throw new Error('Action not available!');
    }

    this.url = Biteship.baseUrl + '/' + this.api_version + '/couriers';
    this.method = 'get';

    return this;
  }

  /**
  * Trackings API
  * @param {string} id
  * @returns {this}
  */
  trackings(id) {
    this._reset();
    if(this._action !== 'retrieve') {
      throw new Error('Action not available!');
    }
    if(!id && typeof id !== 'string') {
      throw new Error('id is required and should be a string!');
    }
    this.url = Biteship.baseUrl + '/' + this.api_version + '/trackings/' + id;
    this.method = 'get';
    return this;
  }

  /**
  * Public Trackings API
  * @param {string} waybillId
  * @param {string} courierId
  * @returns {this}
  */
  publicTrackings(waybillId, courierId) {
    this._reset();
    if(this._action !== 'retrieve') {
      throw new Error('Action not available!');
    }

    if(!waybillId && typeof waybillId !== 'string') {
      throw new Error('waybillId is required and should be a string!');
    }
    if(!courierId && typeof courierId !== 'string') {
      throw new Error('courierId is required and should be a string!');
    }

    this.url = Biteship.baseUrl + '/' + this.api_version + '/trackings/' + waybillId + '/couriers/' + courierId;
    this.method = 'get';
    return this;
  }

  /**
  * Cache
  * @param {number} ttl   this value is in seconds
  * @returns {this}
  */
  cache(ttl) {
    if(this.method === 'get') {
      this._keycache = this._hash(this.url);
      this._ttl = ttl;
    }
    return this;
  }

  /**
  * Build request
  * @returns {object}
  */
  _buildReq() {
    return {
      method: this.method,
      url: this.url,
      headers: {
        'authorization': this.api_key,
        'content-type': 'application/json'
      },
      ...(this.payload && { data: this.payload })
    };
  }

  /**
  * Handle API response and errors
  * @param {*} err
  * @param {*} res
  * @returns {object}
  */
  _handleResponse(err, res) {
    if (!err) {
      const response = { status: res.status, ...res.data };
      if (this._keycache) {
        this.cacheman.set(this._keycache, response, this._ttl);
      }
      return response;
    }

    if (err.response) {
      return { status: err.response.status, ...err.response.data };
    }

    return {
      status: err.request ? 503 : 500,
      success: false,
      error: err.request ? 'No response received from server' : 'Something went wrong',
      code: 0
    };
  }

  /**
  * Sending request as callback
  * @param {callback} _cb
  * @returns {callback}
  */
  _sendReqCallback(_cb) {
    axios(this._buildReq())
      .then(res => {
        if (_cb && typeof _cb === 'function') {
          _cb(null, this._handleResponse(null, res));
        }
      })
      .catch(err => {
        if (_cb && typeof _cb === 'function') {
          _cb(this._handleResponse(err));
        }
      });
  }

  /**
  * Sending request as promise
  * @returns {Promise}
  */
  _sendReqPromise() {
    return axios(this._buildReq())
      .then(res => this._handleResponse(null, res))
      .catch(err => Promise.reject(this._handleResponse(err)));
  }

  /**
  * Send Request (callback based)
  * @param {callback} _cb
  * @returns {callback}
  */
  send(_cb) {
    if(this._keycache !== undefined && this._keycache !== null) {
      this.cacheman.get(this._keycache, function (error, value) {
        if (error) return _cb(error);
        if (value) {
          return _cb(null, value);
        } else {
          return this._sendReqCallback(_cb);
        }
      }.bind(this));
    } else {
      return this._sendReqCallback(_cb);
    }
  }

  /**
  * Send Async Request (promise based)
  * @returns {Promise}
  */
  async sendAsync() {
    try {
      if (this._keycache) {
        const cachedValue = await this.cacheman.get(this._keycache);
        if (cachedValue) {
          return cachedValue;
        }
      }
      return await this._sendReqPromise();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Biteship;
