'use strict';

var _require = require('react'),
    PropTypes = _require.PropTypes;

var Check = require('../view/Check');
var StyleComponent = require('../mixin/StyleComponent');

module.exports = StyleComponent(Check, function (styles, _ref) {
  var size = _ref.size;
  return { styles: styles[size] };
}, {
  s: require('../style/check/check-s.css'),
  m: require('../style/check/check-m.css')
}, {
  size: 's'
}, {
  size: PropTypes.oneOf(['s', 'm'])
});