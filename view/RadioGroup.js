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
    hasValueProp = _require2.hasValueProp,
    indexOf = _require2.indexOf;

var _require3 = require('../tool/identity'),
    generateId = _require3.generateId,
    hasUniqueValues = _require3.hasUniqueValues,
    mapKey = _require3.mapKey,
    mapKeyBasedOnPos = _require3.mapKeyBasedOnPos;

var _require4 = require('../tool/func'),
    isUndefined = _require4.isUndefined,
    noop = _require4.noop;

var _require5 = require('../tool/className'),
    styleName = _require5.styleName;

var RadioButton = require('./RadioButton');
var React = require('react');
var warning = require('../tool/warning');

var didWarnForDefaultValue = false;

var RadioGroup = function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup(props) {
    _classCallCheck(this, RadioGroup);

    var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

    bind(_this, 'onChange');

    _this.controlled = hasValueProp(props);

    if (process.env.NODE_ENV !== 'production' && _this.controlled && !didWarnForDefaultValue) {
      // eslint-disable-line no-undef
      warning(isUndefined(props.defaultValue), 'RadioGroup elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled radioGroup ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');

      didWarnForDefaultValue = true;
    }

    _this.updateKeyMapper(props.hasUniqValues, props.options);

    var value = _this.controlled ? props.value : props.defaultValue;

    // @todo make assertion for single property
    _this.state = {
      prefix: generateId(),
      selected: indexOf(props.options, value)
    };
    return _this;
  }

  _createClass(RadioGroup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var hasUniqValues = _ref.hasUniqValues,
          options = _ref.options,
          value = _ref.value;

      if (this.controlled) {
        this.setState({ selected: indexOf(options, value) });
      }

      if (this.props.hasUniqValues !== hasUniqValues) {
        this.updateKeyMapper(hasUniqValues, options);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e, _, tc) {
      if (!this.controlled) {
        this.setState({ selected: tc });
      }

      this.props.onChange(e, _);
    }

    /**
     * @param {boolean} hasUniqValues
     * @param {object[]} options
     */

  }, {
    key: 'updateKeyMapper',
    value: function updateKeyMapper(hasUniqValues, options) {
      this.mapKey = !(hasUniqValues && hasUniqueValues(options)) ? mapKeyBasedOnPos : mapKey;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        _extends({}, this.props, {
          className: styleName(this.props),
          onChange: undefined }),
        this.renderOptions()
      );
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var _this2 = this;

      var _props = this.props,
          globalDisabled = _props.disabled,
          name = _props.name,
          options = _props.options,
          styles = _props.styles;
      var _state = this.state,
          prefix = _state.prefix,
          selected = _state.selected;


      return options.map(function (option, i) {
        return React.createElement(RadioButton, _extends({}, option, {
          checked: selected === i,
          disabled: globalDisabled || option.disabled,
          key: _this2.mapKey(prefix, option.value, i),
          name: name,
          onChange: _this2.onChange,
          styles: styles,
          tc: i }));
      });
    }
  }]);

  return RadioGroup;
}(Component);

RadioGroup.defaultProps = {
  hasUniqValues: true,
  onChange: noop,
  styleName: 'container',
  styles: {}
};

RadioGroup.propTypes = {
  defaultValue: PropTypes.string,
  hasUniqValues: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  styleName: PropTypes.string,
  styles: PropTypes.shape({
    container: PropTypes.string,
    control: PropTypes.string.isRequired,
    native: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired
  }),
  value: PropTypes.string
};

module.exports = RadioGroup;