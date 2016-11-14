'use strict';

var _require = require('react'),
    PropTypes = _require.PropTypes;

var CheckGroup = require('../view/CheckGroup');
var StyleComponent = require('../mixin/StyleComponent');

module.exports = StyleComponent(CheckGroup, function (styles, _ref) {
  var size = _ref.size;
  return {
    styles: styles[size]
  };
}, {
  s: require('../style/check-group/check-group-s.css'),
  m: require('../style/check-group/check-group-m.css')
}, {
  size: 's'
}, {
  size: PropTypes.oneOf(['s', 'm'])
});