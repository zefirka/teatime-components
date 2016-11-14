'use strict';

var _require = require('react'),
    PropTypes = _require.PropTypes;

var Spin = require('../view/Spin');
var StyleComponent = require('../mixin/StyleComponent');

module.exports = StyleComponent(Spin, function (styles, _ref) {
  var size = _ref.size;
  return { styles: styles[size] };
}, {
  xs: require('../style/spin/spin-xs.css'),
  s: require('../style/spin/spin-s.css'),
  m: require('../style/spin/spin-m.css'),
  l: require('../style/spin/spin-l.css'),
  xl: require('../style/spin/spin-xl.css')
}, {
  size: 's'
}, {
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl'])
});