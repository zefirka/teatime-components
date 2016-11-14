'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('react'),
    Component = _require.Component,
    PropTypes = _require.PropTypes;

var _require2 = require('../tool/component'),
    bind = _require2.bind;

var _require3 = require('../tool/identity'),
    generateId = _require3.generateId;

var _require4 = require('../tool/func'),
    noop = _require4.noop;

var _require5 = require('../tool/className'),
    styleName = _require5.styleName;

var React = require('react');

var Tumbler = function (_Component) {
  _inherits(Tumbler, _Component);

  function Tumbler(props) {
    _classCallCheck(this, Tumbler);

    var _this = _possibleConstructorReturn(this, (Tumbler.__proto__ || Object.getPrototypeOf(Tumbler)).call(this, props));

    bind(_this, 'onChange');

    _this.state = {
      id: _this.props.id || generateId()
    };
    return _this;
  }

  _createClass(Tumbler, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var id = _ref.id;

      if (id) {
        this.setState({ id: id });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var _e$target = e.target,
          checked = _e$target.checked,
          value = _e$target.value;

      this.props.onChange(e, { checked: checked, value: value });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          off = _props.off,
          on = _props.on,
          styles = _props.styles,
          o = _objectWithoutProperties(_props, ['off', 'on', 'styles']);

      var id = this.state.id;

      /**
       * Still there is an issue about controlled and uncontrolled components,
       * related to the input[type="checkbox"] and input[type="radio"].
       * It results in the way controlled components are determined.
       *
       * @see https://github.com/facebook/react/blob/v15.1.0/src/renderers/dom/client/wrappers/ReactDOMInput.js#L171
       * @see https://github.com/facebook/react/issues/6779
       */

      return React.createElement(
        'div',
        { className: styleName(this.props) },
        React.createElement('input', _extends({
          type: 'checkbox'
        }, o, {
          className: styles.native,
          id: id,
          onChange: this.onChange })),
        React.createElement(
          'label',
          { className: styles.control, htmlFor: id },
          React.createElement(
            'span',
            { className: styles.label },
            on
          ),
          React.createElement(
            'span',
            { className: styles.label },
            off
          ),
          React.createElement(
            'span',
            { className: styles.delimiter },
            '\xA0'
          )
        )
      );
    }
  }]);

  return Tumbler;
}(Component);

Tumbler.defaultProps = {
  off: 'Off',
  on: 'On',
  onChange: noop,
  styleName: 'wrapper',
  styles: {}
};

Tumbler.propTypes = {
  name: PropTypes.string.isRequired,
  off: PropTypes.string,
  on: PropTypes.string,
  onChange: PropTypes.func,
  styleName: PropTypes.string,
  styles: PropTypes.shape({
    control: PropTypes.string.isRequired,
    delimiter: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    native: PropTypes.string.isRequired,
    wrapper: PropTypes.string
  })
};

module.exports = Tumbler;