'use strict';

const { curryN, get, isUndefined } = require('lodash/fp');

module.exports = styleName;

function styleName(definedStyles, getter) {
  return curryN(getter.length + 1, styleElement);

  function styleElement(styleName, styles, ...args) {
    return get(styleName, isUndefined(styles)
      ? getter.apply(null, [definedStyles].concat(args))
      : styles);
  }
}
