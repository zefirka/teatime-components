'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('react'),
    Component = _require.Component,
    PropTypes = _require.PropTypes;

var _require2 = require('../tool/component'),
    bind = _require2.bind,
    hasValueProp = _require2.hasValueProp;

var _require3 = require('../tool/className'),
    classNames = _require3.classNames,
    styleName = _require3.styleName;

var _require4 = require('../tool/func'),
    isUndefined = _require4.isUndefined,
    noop = _require4.noop;

var _require5 = require('../tool/color'),
    isHexBased = _require5.isHexBased,
    normalizeColor = _require5.normalizeColor,
    trimHash = _require5.trimHash;

var Input = require('./Input');
var Overlay = require('./Overlay');
var Tile = require('./Tile');
var React = require('react');
var reactOutsideEvent = require('../mixin/ReactOutsideEvent');
var warning = require('../tool/warning');

var didWarnForDefaultValue = false;

var ColorPicker = function (_Component) {
  _inherits(ColorPicker, _Component);

  function ColorPicker(props) {
    _classCallCheck(this, ColorPicker);

    var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, props));

    bind(_this, ['onChange', 'onInputBlur', 'onInputFocus', 'onKeyDown', 'onPreviewClick', 'onTileClick']);

    _this.controlled = hasValueProp(props);

    if (process.env.NODE_ENV !== 'production' && _this.controlled && !didWarnForDefaultValue) {
      // eslint-disable-line no-undef
      warning(typeof props.defaultValue === 'undefined', 'ColorPicker contains an input of type text with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');

      didWarnForDefaultValue = true;
    }

    var value = _this.controlled ? props.value : props.defaultValue;

    _this.state = {
      isOpened: false,
      value: !isUndefined(value) ? trimHash(value) : 'FFFFFF'
    };
    return _this;
  }

  _createClass(ColorPicker, [{
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
    value: function onChange(e, data) {
      this.updateValue(e, data.value);
    }
  }, {
    key: 'onInputBlur',
    value: function onInputBlur(e) {
      var nextValue = normalizeColor(this.state.value);
      if (nextValue === this.state.value) return;
      this.updateValue(e, normalizeColor(nextValue || 'FFFFFF'));
    }
  }, {
    key: 'onInputFocus',
    value: function onInputFocus() {
      // @todo add possibility to control focus from outside
      if (this.state.isOpened === false) return;
      this.setState({ isOpened: false });
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      if (this.props.disabled) return;

      var preview = this.refs.preview;

      if (e.keyCode === 9 && preview && preview === e.target) {
        // tab
        this.setState({ isOpened: false });
      }
    }
  }, {
    key: 'onPreviewClick',
    value: function onPreviewClick() {
      this.setState({ isOpened: !this.state.isOpened });
    }
  }, {
    key: 'onOutsideEvent',
    value: function onOutsideEvent() {
      if (this.state.isOpened === false) return;
      this.setState({ isOpened: false });
    }
  }, {
    key: 'onTileClick',
    value: function onTileClick(e, color) {
      this.updateValue(e, trimHash(color));
      this.focus();
    }
  }, {
    key: 'updateValue',
    value: function updateValue(e, value) {
      if (!this.controlled) {
        this.setState({ isOpened: false, value: value });
      }

      this.props.onChange(e, { isOpened: false, value: value });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          styles = _props.styles,
          o = _objectWithoutProperties(_props, ['id', 'styles']);

      return React.createElement(
        'div',
        {
          className: styleName(this.props, { isFixedWrapper: this.props.hasFixedWidth }),
          onKeyDown: this.onKeyDown },
        this.renderPreview(),
        React.createElement(Input, _extends({}, o, {
          className: undefined,
          defaultValue: undefined,
          id: id,
          onBlur: this.onInputBlur,
          onChange: this.onChange,
          onFocus: this.onInputFocus,
          ref: 'control',
          styleName: undefined,
          styles: styles,
          value: this.state.value })),
        this.renderMenu()
      );
    }
  }, {
    key: 'renderPreview',
    value: function renderPreview() {
      var _props2 = this.props,
          disabled = _props2.disabled,
          styles = _props2.styles;

      var value = this.state.value;

      return React.createElement('button', {
        className: styles.preview,
        disabled: disabled,
        onClick: this.onPreviewClick,
        ref: 'preview',
        style: {
          background: '#' + (isHexBased(value) ? trimHash(value) : 'fff')
        } });
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu() {
      var _classNames;

      var styles = this.props.styles;


      return React.createElement(
        Overlay,
        { className: classNames(styles.menu, (_classNames = {}, _defineProperty(_classNames, styles.isClosedMenu, !this.state.isOpened), _defineProperty(_classNames, styles.isOpenedMenu, this.state.isOpened), _defineProperty(_classNames, styles.isFixedMenu, this.props.hasFixedWidth), _classNames)) },
        this.renderTiles()
      );
    }
  }, {
    key: 'renderTiles',
    value: function renderTiles() {
      if (!this.state.isOpened) {
        return null;
      }

      var _props3 = this.props,
          palette = _props3.palette,
          styles = _props3.styles;

      var tiles = [];

      for (var length = palette.length, i = 0; i < length; ++i) {
        var tile = palette[i];

        tiles.push(React.createElement(Tile, {
          color: '#' + tile,
          key: '_' + tile,
          onClick: this.onTileClick,
          styles: styles }));
      }

      return tiles;
    }
  }]);

  return ColorPicker;
}(Component);

ColorPicker.defaultProps = {
  hasFixedWidth: false,
  onChange: noop,
  palette: ['000000', 'CC0000', 'CC6600', 'CCCC00', '66CC00', '00CC00', '00CC66', '00CCCC', '0066CC', '0000CC', '6600CC', 'CC00CC', 'CC0066', '333333', 'FF0000', 'FF8000', 'FFFF00', '80FF00', '00FF00', '00FF80', '00FFFF', '007FFF', '0000FF', '7F00FF', 'FF00FF', 'FF0080', '666666', 'FF3333', 'FF9933', 'FFFF33', '99FF33', '33FF33', '33FF99', '33FFFF', '3399FF', '3333FF', '9933FF', 'FF33FF', 'FF3399', '999999', 'FF6666', 'FFB366', 'FFFF66', 'B3FF66', '66FF66', '66FFB3', '66FFFF', '66B2FF', '6666FF', 'B266FF', 'FF66FF', 'FF66B3', 'CCCCCC', 'FF9999', 'FFCC99', 'FFFF99', 'CCFF99', '99FF99', '99FFCC', '99FFFF', '99CCFF', '9999FF', 'CC99FF', 'FF99FF', 'FF99CC', 'FFFFFF', 'FFCCCC', 'FFE6CC', 'FFFFCC', 'E6FFCC', 'CCFFCC', 'CCFFE6', 'CCFFFF', 'CCE5FF', 'CCCCFF', 'E5CCFF', 'FFCCFF', 'FFCCE6'],
  styleName: 'container'
};

// @todo add color validation for value prop
ColorPicker.propTypes = {
  hasFixedWidth: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  palette: PropTypes.array,
  styleName: PropTypes.string,
  styles: PropTypes.object
};

module.exports = reactOutsideEvent(ColorPicker, ['click']);