'use strict';

var _require = require('react'),
    PropTypes = _require.PropTypes;

var Select = require('../view/Select');
var StyleComponent = require('../mixin/StyleComponent');

module.exports = StyleComponent(Select, function (styles, _ref) {
  var size = _ref.size;
  return {
    styles: styles[size]
  };
}, {
  xs: require('../style/select/select-xs.css'),
  s: require('../style/select/select-s.css'),
  m: require('../style/select/select-m.css')
}, {
  size: 's'
}, {
  size: PropTypes.oneOf(['xs', 's', 'm'])
});