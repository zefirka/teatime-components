'use strict';

var _require = require('react'),
    PropTypes = _require.PropTypes;

var Input = require('../view/Input');
var StyleComponent = require('../mixin/StyleComponent');

module.exports = StyleComponent(Input, function (styles, _ref) {
  var size = _ref.size;
  return { styles: styles[size] };
}, {
  'xs': require('../style/input/input-xs.css'),
  's': require('../style/input/input-s.css'),
  'm': require('../style/input/input-m.css')
}, {
  size: 's'
}, {
  size: PropTypes.oneOf(['xs', 's', 'm'])
});