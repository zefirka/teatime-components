'use strict';

var counter = 0;

module.exports = generateId;

/**
 * @return {string}
 */
function generateId() {
  return `_teatime${++counter}`;
}
