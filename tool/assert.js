'use strict';

const { noop } = require('lodash/fp');

var assert = noop;

if (process.env.NODE_ENV !== 'production') { // eslint-disable-line no-undef
  /**
   * @param  {boolean} condition
   * @param  {string} message
   * @return {void}
   */
  assert = function assert(condition, message) {
    if (condition) return;
    console.error(message); // eslint-disable-line no-console
  };
}

module.exports = assert;
