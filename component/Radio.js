'use strict';

var _require = require('react'),
    PropTypes = _require.PropTypes;

var Radio = require('../view/Radio');
var StyleComponent = require('../mixin/StyleComponent');

module.exports = StyleComponent(Radio, function (styles, _ref) {
  var size = _ref.size;
  return { styles: styles[size] };
}, {
  s: require('../style/radio/radio-s.css'),
  m: require('../style/radio/radio-m.css')
}, {
  size: 's'
}, {
  size: PropTypes.oneOf(['s', 'm'])
});