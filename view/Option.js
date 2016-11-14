'use strict';

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

var React = require('react');

var Option = function (_Component) {
  _inherits(Option, _Component);

  function Option(props) {
    _classCallCheck(this, Option);

    var _this = _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

    bind(_this, ['onFocus', 'onSelect']);
    return _this;
  }

  _createClass(Option, [{
    key: 'onFocus',
    value: function onFocus(e) {
      if (this.props.isFocused) return;
      this.props.onFocus(e, { value: this.props.value }, this.props.tc);
    }
  }, {
    key: 'onSelect',
    value: function onSelect(e) {
      e.stopPropagation();
      this.props.onSelect(e, { value: this.props.value }, this.props.tc);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'span',
        {
          className: this.props.className,
          'data-value': this.props.value,
          onClick: this.onSelect,
          onMouseEnter: this.onFocus },
        this.props.children
      );
    }
  }]);

  return Option;
}(Component);

Option.defaultProps = {
  onFocus: noop,
  onSelect: noop
};

Option.propTypes = {
  isFocused: PropTypes.bool,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  tc: PropTypes.any
};

module.exports = Option;