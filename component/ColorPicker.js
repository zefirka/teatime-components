'use strict';

var _require = require('react'),
    PropTypes = _require.PropTypes;

var ColorPicker = require('../view/ColorPicker');
var StyleComponent = require('../mixin/StyleComponent');

module.exports = StyleComponent(ColorPicker, function (styles, _ref) {
  var size = _ref.size;
  return { styles: styles[size] };
}, {
  xs: require('../style/color-picker/color-picker-xs.css'),
  s: require('../style/color-picker/color-picker-s.css'),
  m: require('../style/color-picker/color-picker-m.css')
}, {
  size: 'm'
}, {
  size: PropTypes.oneOf(['xs', 's', 'm'])
});