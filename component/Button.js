'use strict';

var _require = require('react'),
    PropTypes = _require.PropTypes;

var Button = require('../view/Button');
var StyleComponent = require('../mixin/StyleComponent');

module.exports = StyleComponent(Button, function (styles, _ref) {
  var size = _ref.size,
      theme = _ref.theme;
  return { styles: styles[theme + '-' + size] };
}, {
  'action-xs': require('../style/button/button-action-xs.css'),
  'action-s': require('../style/button/button-action-s.css'),
  'action-m': require('../style/button/button-action-m.css'),
  'action-l': require('../style/button/button-action-l.css'),
  'link-xs': require('../style/button/button-link-xs.css'),
  'link-s': require('../style/button/button-link-s.css'),
  'link-m': require('../style/button/button-link-m.css'),
  'link-l': require('../style/button/button-link-l.css'),
  'normal-xs': require('../style/button/button-normal-xs.css'),
  'normal-s': require('../style/button/button-normal-s.css'),
  'normal-m': require('../style/button/button-normal-m.css'),
  'normal-l': require('../style/button/button-normal-l.css')
}, {
  size: 's',
  theme: 'normal'
}, {
  size: PropTypes.oneOf(['xs', 's', 'm', 'l']),
  theme: PropTypes.oneOf(['action', 'link', 'normal'])
});