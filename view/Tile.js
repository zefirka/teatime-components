'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('react'),
    Component = _require.Component,
    PropTypes = _require.PropTypes;

var _require2 = require('../tool/component'),
    bind = _require2.bind;

var _require3 = require('../tool/className'),
    styleName = _require3.styleName;

var React = require('react');

var Tile = function (_Component) {
  _inherits(Tile, _Component);

  function Tile(props) {
    _classCallCheck(this, Tile);

    var _this = _possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).call(this, props));

    bind(_this, 'onClick');
    return _this;
  }

  _createClass(Tile, [{
    key: 'onClick',
    value: function onClick(e) {
      this.props.onClick(e, this.props.color);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', _extends({}, this.props, {
        className: styleName(this.props),
        onClick: this.onClick,
        style: { backgroundColor: this.props.color } }));
    }
  }]);

  return Tile;
}(Component);

Tile.defaultProps = {
  styleName: 'item'
};

Tile.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  styleName: PropTypes.string
};

module.exports = Tile;