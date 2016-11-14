'use strict';

var _require = require('react'),
    PropTypes = _require.PropTypes;

var RadioGroup = require('../view/RadioGroup');
var StyleComponent = require('../mixin/StyleComponent');

module.exports = StyleComponent(RadioGroup, function (styles, _ref) {
  var size = _ref.size;
  return {
    styles: styles[size]
  };
}, {
  xs: require('../style/radio-group/radio-group-xs.css'),
  s: require('../style/radio-group/radio-group-s.css'),
  m: require('../style/radio-group/radio-group-m.css'),
  l: require('../style/radio-group/radio-group-l.css')
}, {
  size: 's'
}, {
  size: PropTypes.oneOf(['xs', 's', 'm', 'l'])
});