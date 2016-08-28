'use strict';

const { curryN, get, isUndefined } = require('lodash/fp');

module.exports = curryN(5, style);

/**
 * @param  {function}    tokenize
 * @param  {object}      definedStyles
 * @param  {object|null} styles
 * @param  {string}      token
 * @param  {...string}   args
 * @return {string}
 */
function style(tokenize, definedStyles, styles, token, ...args) {
  return get(`${tokenize.apply(null, args)}.${token}`, isUndefined(styles)
    ? definedStyles
    : styles);
}
