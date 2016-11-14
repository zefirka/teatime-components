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

var _require3 = require('../tool/func'),
    noop = _require3.noop;

var _require4 = require('../tool/className'),
    styleName = _require4.styleName;

var React = require('react');

var Textarea = function (_Component) {
  _inherits(Textarea, _Component);

  function Textarea(props) {
    _classCallCheck(this, Textarea);

    var _this = _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call(this, props));

    bind(_this, 'onChange');
    return _this;
  }

  _createClass(Textarea, [{
    key: 'focus',
    value: function focus() {
      if (this.refs.control) {
        this.refs.control.focus();
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      this.props.onChange(e, { value: e.target.value });
    }
  }, {
    key: 'select',
    value: function select() {
      if (this.refs.control) {
        this.refs.control.select();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('textarea', _extends({}, this.props, {
        className: styleName(this.props),
        onChange: this.onChange,
        ref: 'control' }));
    }
  }]);

  return Textarea;
}(Component);

Textarea.defaultProps = {
  onChange: noop,
  rows: 3,
  styleName: 'control',
  styles: {}
};

Textarea.propTypes = {
  cols: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  rows: PropTypes.number,
  styleName: PropTypes.string,
  styles: PropTypes.shape({
    control: PropTypes.string
  })
};

module.exports = Textarea;