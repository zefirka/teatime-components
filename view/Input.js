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
    bind = _require2.bind,
    hasValueProp = _require2.hasValueProp;

var _require3 = require('../tool/func'),
    isUndefined = _require3.isUndefined,
    noop = _require3.noop;

var _require4 = require('../tool/className'),
    style = _require4.style,
    styleName = _require4.styleName;

var React = require('react');
var warning = require('../tool/warning');

var didWarnForDefaultValue = false;

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.controlled = hasValueProp(props);

    if (process.env.NODE_ENV !== 'production' && _this.controlled && !didWarnForDefaultValue) {
      // eslint-disable-line no-undef
      warning(isUndefined(props.defaultValue), 'Input contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', props.type);

      didWarnForDefaultValue = true;
    }

    var value = _this.controlled ? props.value : props.defaultValue;

    _this.state = {
      value: !isUndefined(value) ? value : ''
    };

    bind(_this, ['onChange', 'onClearClick']);
    return _this;
  }

  _createClass(Input, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.controlled) {
        this.setState({ value: nextProps.value });
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.refs.control) {
        this.refs.control.focus();
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      this.updateValue(e, e.target.value);
    }
  }, {
    key: 'onClearClick',
    value: function onClearClick(e) {
      if (this.props.disabled) {
        return;
      }

      this.updateValue(e, '');
      this.focus();
    }
  }, {
    key: 'select',
    value: function select() {
      if (this.refs.control) {
        this.refs.control.select();
      }
    }
  }, {
    key: 'updateValue',
    value: function updateValue(e, value) {
      if (!this.controlled) {
        this.setState({ value: value });
      }

      this.props.onChange(e, { value: value });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'span',
        { className: styleName(this.props) },
        this.renderInput(),
        this.renderClear()
      );
    }
  }, {
    key: 'renderClear',
    value: function renderClear() {
      if (!this.state.value || this.props.disabled) {
        return null;
      }

      return React.createElement('span', {
        className: this.props.styles.clear,
        onClick: this.onClearClick });
    }
  }, {
    key: 'renderInput',
    value: function renderInput() {
      return React.createElement('input', _extends({}, this.props, {
        className: style(this.props.styles, 'control', {
          hasClear: this.state.value
        }),
        defaultValue: undefined // Cause we have a controlled input
        , onChange: this.onChange,
        ref: 'control',
        value: this.state.value }));
    }
  }]);

  return Input;
}(Component);

Input.defaultProps = {
  onChange: noop,
  styleName: 'wrapper',
  styles: {},
  type: 'text'
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  styleName: PropTypes.string,
  styles: PropTypes.shape({
    clear: PropTypes.string.isRequired,
    control: PropTypes.string.isRequired,
    wrapper: PropTypes.string
  }),
  type: PropTypes.oneOf(['password', 'text'])
};

module.exports = Input;