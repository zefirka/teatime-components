'use strict';

var _require = require('react'),
    PropTypes = _require.PropTypes;

var StyleComponent = require('../mixin/StyleComponent');
var Textarea = require('../view/Textarea');

module.exports = StyleComponent(Textarea, function (styles, _ref) {
  var size = _ref.size;
  return { styles: styles[size] };
}, {
  s: require('../style/textarea/textarea-s.css'),
  m: require('../style/textarea/textarea-m.css')
}, {
  size: 's'
}, {
  size: PropTypes.oneOf(['s', 'm'])
});