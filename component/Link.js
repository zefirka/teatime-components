'use strict';

var _require = require('react'),
    PropTypes = _require.PropTypes;

var Link = require('../view/Link');
var StyleComponent = require('../mixin/StyleComponent');

module.exports = StyleComponent(Link, function (styles, _ref) {
  var size = _ref.size,
      theme = _ref.theme;
  return { styles: styles[theme + '-' + size] };
}, {
  'action-xs': require('../style/link/link-action-xs.css'),
  'action-s': require('../style/link/link-action-s.css'),
  'action-m': require('../style/link/link-action-m.css'),
  'action-l': require('../style/link/link-action-l.css'),
  'link-xs': require('../style/link/link-link-xs.css'),
  'link-s': require('../style/link/link-link-s.css'),
  'link-m': require('../style/link/link-link-m.css'),
  'link-l': require('../style/link/link-link-l.css'),
  'normal-xs': require('../style/link/link-normal-xs.css'),
  'normal-s': require('../style/link/link-normal-s.css'),
  'normal-m': require('../style/link/link-normal-m.css'),
  'normal-l': require('../style/link/link-normal-l.css')
}, {
  size: 's',
  theme: 'link'
}, {
  size: PropTypes.oneOf(['s', 'm', 'l']),
  theme: PropTypes.oneOf(['action', 'link', 'normal'])
});