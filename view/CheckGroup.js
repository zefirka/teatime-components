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

var _require3 = require('../tool/identity'),
    generateId = _require3.generateId,
    hasUniqueValues = _require3.hasUniqueValues,
    mapKey = _require3.mapKey,
    mapKeyBasedOnPos = _require3.mapKeyBasedOnPos;

var _require4 = require('../tool/func'),
    isUndefined = _require4.isUndefined,
    mapRange = _require4.mapRange,
    noop = _require4.noop;

var _require5 = require('../tool/className'),
    styleName = _require5.styleName;

var Check = require('./Check');
var React = require('react');
var warning = require('../tool/warning');

var didWarnForDefaultValue = false;

var CheckGroup = function (_Component) {
  _inherits(CheckGroup, _Component);

  function CheckGroup(props) {
    _classCallCheck(this, CheckGroup);

    var _this = _possibleConstructorReturn(this, (CheckGroup.__proto__ || Object.getPrototypeOf(CheckGroup)).call(this, props));

    bind(_this, 'onChange');

    _this.controlled = hasValueProp(props);

    if (process.env.NODE_ENV !== 'production' && _this.controlled && !didWarnForDefaultValue) {
      // eslint-disable-line no-undef
      warning(isUndefined(props.defaultValue), 'CheckGroup elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');

      didWarnForDefaultValue = true;
    }

    _this.updateKeyMapper(props.hasUniqValues, props.options);

    var value = _this.controlled ? props.value : props.defaultValue;

    _this.state = {
      prefix: generateId(),
      values: mapValueToState(props.options, value || [])
    };
    return _this;
  }

  _createClass(CheckGroup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var hasUniqValues = _ref.hasUniqValues,
          options = _ref.options,
          value = _ref.value;

      if (this.controlled) {
        this.setState({ values: mapValueToState(options, value) });
      }

      if (this.props.hasUniqValues !== hasUniqValues) {
        this.updateKeyMapper(hasUniqValues, options);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e, _ref2, tc) {
      var checked = _ref2.checked;

      var values = updateValue(this.state.values, tc, checked);

      if (!this.controlled) {
        this.setState({ values: values });
      }

      this.props.onChange(e, {
        value: mapStateToValue(this.props.options, values)
      });
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
        this.renderColumns()
      );
    }
  }, {
    key: 'renderColumns',
    value: function renderColumns() {
      var _this2 = this;

      var _props = this.props,
          cols = _props.cols,
          styles = _props.styles;
      var prefix = this.state.prefix;

      var rCols = Math.max(cols || 0, 1);

      if (rCols === 1) {
        return this.renderOptions(0, rCols);
      }

      return mapRange(function (step) {
        return React.createElement(
          'div',
          {
            className: styles.column,
            key: mapKeyBasedOnPos(prefix, '_', step) },
          _this2.renderOptions(step, rCols)
        );
      }, rCols);
    }

    /**
     * @param  {number} start
     * @param  {number} step
     * @return {component[]}
     */

  }, {
    key: 'renderOptions',
    value: function renderOptions(start, step) {
      var _props2 = this.props,
          globalDisabled = _props2.disabled,
          name = _props2.name,
          options = _props2.options,
          styles = _props2.styles;
      var _state = this.state,
          prefix = _state.prefix,
          values = _state.values;


      var result = [];

      for (var i = start; i < options.length; i += step) {
        result.push(React.createElement(Check, _extends({}, options[i], {
          disabled: globalDisabled || options[i].disabled,
          checked: values[i],
          key: this.mapKey(prefix, options[i].value, i),
          name: name,
          onChange: this.onChange,
          styles: styles,
          tc: i })));
      }

      return result;
    }
  }]);

  return CheckGroup;
}(Component);

CheckGroup.defaultProps = {
  hasUniqValues: true,
  onChange: noop,
  styleName: 'container',
  styles: {}
};

CheckGroup.propTypes = {
  cols: PropTypes.number,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  hasUniqValues: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onContextMenu: PropTypes.func,
  options: PropTypes.array.isRequired,
  styleName: PropTypes.string,
  styles: PropTypes.shape({
    column: PropTypes.string,
    container: PropTypes.string,
    control: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    native: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired
  }),
  value: PropTypes.arrayOf(PropTypes.string)
};

module.exports = CheckGroup;

/**
 * @param  {object[]} options
 * @param  {boolean[]} values
 * @return {string[]}
 */
function mapStateToValue(options, values) {
  var selected = [];

  for (var i = 0; i < values.length; ++i) {
    if (!values[i]) {
      continue;
    }

    selected.push(options[i].value);
  }

  return selected;
}

/**
 * @param  {object[]} options
 * @param  {string[]} selected
 * @return {boolean[]}
 */
function mapValueToState(options, selected) {
  var selectedMap = {};

  var length = selected.length;
  while (length--) {
    selectedMap[selected[length]] = null;
  }

  return options.map(function (_ref3) {
    var value = _ref3.value;
    return value in selectedMap;
  });
}

/**
 * @param  {boolean[]} values
 * @param  {number} position
 * @param  {boolean} target
 * @return {boolean[]}
 */
function updateValue(values, position, target) {
  return values.map(function (value, i) {
    return position !== i ? value : target;
  });
}