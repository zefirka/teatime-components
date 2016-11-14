'use strict';

var _require = require('react'),
    PropTypes = _require.PropTypes;

var StyleComponent = require('../mixin/StyleComponent');
var Tumbler = require('../view/Tumbler');

module.exports = StyleComponent(Tumbler, function (styles, _ref) {
  var size = _ref.size;
  return { styles: styles[size] };
}, {
  xs: require('../style/tumbler/tumbler-xs.css'),
  s: require('../style/tumbler/tumbler-s.css'),
  m: require('../style/tumbler/tumbler-m.css')
}, {
  size: 'xs'
}, {
  size: PropTypes.oneOf(['xs', 's', 'm'])
});