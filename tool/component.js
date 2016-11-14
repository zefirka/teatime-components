'use strict';

exports.bind = bind;
exports.hasCheckedProp = hasCheckedProp;
exports.hasValueProp = hasValueProp;
exports.indexOf = indexOf;

/**
 * @param  {object} context
 * @param  {string|string[]} methodNames
 */
function bind(context, methodNames) {
  var methods = !Array.isArray(methodNames) ? [methodNames] : methodNames;

  var length = methods.length;
  for (var method, i = 0; i < length; ++i) {
    method = methods[i];
    context[method] = context[method].bind(context);
  }
}

/**
 * @see    https://facebook.github.io/react/docs/forms.html#controlled-components
 * @param  {object}  props
 * @return {boolean}
 */
function hasCheckedProp(props) {
  return props.checked !== undefined;
}

/**
 * @see    https://facebook.github.io/react/docs/forms.html#controlled-components
 * @param  {object}  props
 * @return {boolean}
 */
function hasValueProp(props) {
  return props.value !== undefined;
}

/**
 * @param  {object[]} collection
 * @param  {string} value
 * @param  {string} [prop]
 * @return {number}
 */
function indexOf(collection, value) {
  var prop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'value';

  var length = collection.length;
  for (var i = 0; i < length; ++i) {
    if (collection[i][prop] !== value) {
      continue;
    }

    return i;
  }

  return -1;
}