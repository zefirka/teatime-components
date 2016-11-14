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

var _require3 = require('react-dom'),
    findDOMNode = _require3.findDOMNode;

var _require4 = require('../tool/identity'),
    generateId = _require4.generateId,
    hasUniqueValues = _require4.hasUniqueValues,
    mapKey = _require4.mapKey,
    mapKeyBasedOnPos = _require4.mapKeyBasedOnPos;

var _require5 = require('../tool/func'),
    isUndefined = _require5.isUndefined,
    noop = _require5.noop;

var _require6 = require('../tool/className'),
    style = _require6.style,
    styleName = _require6.styleName;

var Option = require('./Option');
var Overlay = require('./Overlay');
var React = require('react');
var fuzzysearch = require('fuzzysearch');
var reactOutsideEvent = require('../mixin/ReactOutsideEvent');
var warning = require('../tool/warning');

var didWarnForDefaultValue = false;

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    bind(_this, ['onInputChange', 'onKeyDown', 'onMenuToggle', 'onOptionFocus', 'onOptionSelect']);

    _this.controlled = hasValueProp(props);

    if (process.env.NODE_ENV !== 'production' && _this.controlled && !didWarnForDefaultValue) {
      // eslint-disable-line no-undef
      warning(isUndefined(props.defaultValue), 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');

      didWarnForDefaultValue = true;
    }

    _this.updateKeyMapper(props.hasUniqValues, props.options);

    var value = _this.controlled ? props.value : props.defaultValue;

    var selected = !isUndefined(value) ? indexOf(props.options, value) : 0; // in case of uncontrolled component

    _this.state = {
      focused: -1,
      inFocus: false,
      inputValue: '',
      isOpened: false,
      prefix: generateId(),
      selected: selected
    };
    return _this;
  }

  _createClass(Select, [{
    key: 'closeMenu',
    value: function closeMenu() {
      this.setState({
        isOpened: false,
        focused: -1,
        inputValue: ''
      });
    }
  }, {
    key: 'openMenu',
    value: function openMenu() {
      this.setState({
        isOpened: true,
        focused: this.state.selected
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.refs.menu && this.refs.selected && this.state.isOpened && !this.wereOptionsShown) {
        this.wereOptionsShown = true;

        var menu = findDOMNode(this.refs.menu);
        var selected = findDOMNode(this.refs.selected);
        // small fix for the padding offset. should change CSS in future.
        menu.scrollTop = selected.offsetTop < 7 ? 0 : selected.offsetTop;
      } else if (!this.state.isOpened) {
        this.wereOptionsShown = false;
      }

      if (this.wasKeyPressed && this.refs.menu && this.refs.selected) {
        this.wasKeyPressed = false;

        var _menu = findDOMNode(this.refs.menu);
        var _selected = findDOMNode(this.refs.selected);
        var menuRect = _menu.getBoundingClientRect();
        var selectedRect = _selected.getBoundingClientRect();
        if (selectedRect.bottom > menuRect.bottom || selectedRect.top < menuRect.top) {
          _menu.scrollTop = _selected.offsetTop + _selected.clientHeight - _menu.offsetHeight;
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var hasUniqValues = _ref.hasUniqValues,
          options = _ref.options,
          value = _ref.value;

      if (this.controlled) {
        this.setState({
          selected: indexOf(options, value)
        });
      }

      if (this.props.hasUniqValues !== hasUniqValues) {
        this.updateKeyMapper(hasUniqValues, options);
      }
    }
  }, {
    key: 'filterOptions',
    value: function filterOptions() {
      var inputValue = this.state.inputValue.toLowerCase();

      if (!this.state.inputValue) {
        return this.props.options;
      }

      var filteredOptions = [];
      var getHaystack = this.props.getHaystack || this.getHaystack;
      var options = this.props.options || [];

      for (var length = options.length, i = 0; i < length; ++i) {
        if (fuzzysearch(inputValue, getHaystack(options[i]).toLowerCase())) {
          filteredOptions.push(options[i]);
        }
      }

      return filteredOptions;
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.refs.label) {
        this.refs.label.focus();
      }
    }
  }, {
    key: 'focusNextOption',
    value: function focusNextOption() {
      var nextFocused = this.state.focused + 1;

      this.wasKeyPressed = true;

      this.setState({
        focused: nextFocused < this._availableOptions.length ? nextFocused : this._availableOptions.length - 1
      });
    }
  }, {
    key: 'focusPreviousOption',
    value: function focusPreviousOption() {
      var nextFocused = Math.max(this.state.focused - 1, 0);

      this.wasKeyPressed = true;

      this.setState({
        focused: nextFocused < this._availableOptions.length ? nextFocused : this._availableOptions.length - 1
      });
    }

    /**
     * @param  {object} option
     * @param  {string} option.label
     * @return {string}
     */

  }, {
    key: 'getHaystack',
    value: function getHaystack(option) {
      return option.label;
    }

    /**
     * @param  {number} selected
     * @return {string}
     */

  }, {
    key: 'getSelectedLabel',
    value: function getSelectedLabel(selected) {
      return selected !== -1 ? this.props.options[selected].label : this.props.placeholder;
    }

    /**
     * @param  {number} selected
     * @return {string}
     */

  }, {
    key: 'getSelectedValue',
    value: function getSelectedValue(selected) {
      return selected !== -1 ? this.props.options[selected].value : '';
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(e) {
      this.setState({
        inputValue: e.target.value,
        isOpened: true
      });
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      if (this.props.disabled) return;

      var isOpened = this.state.isOpened;


      switch (e.keyCode) {
        case 9:
          // tab
          if (!isOpened) return;
          return void this.closeMenu();

        case 13:
          // enter
          if (!isOpened) return;
          e.stopPropagation();
          this.updateValue(e, this.state.focused);
          break;

        case 27:
          // esc
          if (!isOpened) return;
          this.closeMenu();
          this.focus();
          break;

        case 32:
          // space
          if (this.props.isSearchable) return;

          if (!isOpened) {
            this.openMenu();
          } else {
            this.updateValue(e, this.state.focused);
          }

          break;

        case 38:
          // up
          if (!isOpened) {
            this.openMenu();
          } else {
            this.focusPreviousOption();
          }

          break;

        case 40:
          // down
          if (!isOpened) {
            this.openMenu();
          } else {
            this.focusNextOption();
          }

          break;

        default:
          return;
      }

      e.preventDefault();
    }
  }, {
    key: 'onMenuToggle',
    value: function onMenuToggle() {
      if (this.state.isOpened) {
        return void this.closeMenu();
      }

      return void this.openMenu();
    }

    /**
     * @param {object} e
     * @param {*} _
     * @param {number} tc
     */

  }, {
    key: 'onOptionFocus',
    value: function onOptionFocus(e, _, tc) {
      if (this.state.focused === tc) return;
      this.setState({ focused: tc });
    }

    /**
     * @param {object} e
     * @param {*} _
     * @param {number} tc
     */

  }, {
    key: 'onOptionSelect',
    value: function onOptionSelect(e, _, tc) {
      this.updateValue(e, tc);
      this.focus();
    }
  }, {
    key: 'onOutsideEvent',
    value: function onOutsideEvent() {
      if (!this.state.isOpened) return;
      this.closeMenu();
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

    /**
     * @param {object} e
     * @param {number} nextSelected
     */

  }, {
    key: 'updateValue',
    value: function updateValue(e, focused) {
      var nextState = { isOpened: false };
      var nextSelected = this.state.inputValue ? indexOf(this.props.options, this._availableOptions[focused].value) : focused;

      if (focused === -1 || nextSelected === this.state.selected) {
        return void this.setState(nextState);
      }

      if (!this.controlled) {
        nextState.selected = nextSelected;
      }

      if (this.props.isSearchable) {
        nextState.inputValue = '';
      }

      this.setState(nextState);
      this.props.onChange(e, { value: this.props.options[nextSelected].value });
    }
  }, {
    key: 'render',
    value: function render() {
      var options = this._availableOptions = this.filterOptions();

      return React.createElement(
        'div',
        { className: styleName(this.props, { isFixedWrapper: this.props.hasFixedWidth }) },
        this.renderValue(),
        this.renderLabel(),
        this.renderMenu(options)
      );
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      if (!this.props.isSearchable) {
        return React.createElement(
          'button',
          {
            className: style(this.props.styles, 'control', {
              isClosedControl: !this.state.isOpened,
              isOpenedControl: this.state.isOpened
            }),
            disabled: this.props.disabled,
            onClick: this.onMenuToggle,
            onKeyDown: this.onKeyDown,
            ref: 'label',
            tabIndex: this.props.tabIndex || 0 },
          React.createElement(
            'span',
            { className: style(this.props.styles, 'label') },
            this.getSelectedLabel(this.state.selected)
          )
        );
      }

      return React.createElement(
        'span',
        {
          className: style(this.props.styles, 'control', {
            isClosedControl: !this.state.isOpened,
            isOpenedControl: this.state.isOpened
          }) },
        React.createElement('input', {
          className: this.props.styles.input,
          disabled: this.props.disabled,
          onChange: this.onInputChange,
          onClick: this.onMenuToggle,
          onKeyDown: this.onKeyDown,
          ref: 'label',
          tabIndex: this.props.tabIndex || 0,
          type: 'text',
          value: this.state.inputValue }),
        React.createElement(
          'span',
          { className: style(this.props.styles, 'label') },
          this.state.inputValue ? '' : this.getSelectedLabel(this.state.selected)
        )
      );
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu(options) {
      return React.createElement(
        Overlay,
        {
          className: style(this.props.styles, 'menu', {
            isFixedMenu: this.props.hasFixedWidth,
            isClosedMenu: !this.state.isOpened,
            isOpenedMenu: this.state.isOpened
          }),
          ref: 'menu' },
        this.renderOptions(options)
      );
    }

    /**
     * @param  {option} option
     * @return {string}
     */

  }, {
    key: 'renderOption',
    value: function renderOption(option) {
      return option.label;
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions(options) {
      if (!this.state.isOpened) {
        return null;
      }

      var _props = this.props,
          hasFixedWidth = _props.hasFixedWidth,
          styles = _props.styles;

      var length = options.length;

      if (this.props.isSearchable && length === 0) {
        return React.createElement(
          Option,
          {
            className: styles.empty },
          this.props.noResults
        );
      }

      var _state = this.state,
          focused = _state.focused,
          prefix = _state.prefix,
          selected = _state.selected;

      var renderOption = this.props.renderOption || this.renderOption;

      var components = [];
      var isFocused;
      var isSelected;
      var option;
      var ref;

      for (var i = 0; i < length; ++i) {
        isFocused = focused === i;
        isSelected = selected === i;
        ref = isFocused ? 'selected' : null;

        option = options[i];

        components.push(React.createElement(
          Option,
          _extends({}, option, {
            className: style(styles, 'item', {
              isFixedItem: hasFixedWidth,
              isFocusedItem: isFocused,
              isSelectedItem: isSelected
            }),
            isFocused: isFocused,
            key: this.mapKey(prefix, option.value, i),
            onFocus: this.onOptionFocus,
            onSelect: this.onOptionSelect,
            ref: ref,
            tc: i }),
          renderOption(option)
        ));
      }

      return components;
    }
  }, {
    key: 'renderValue',
    value: function renderValue() {
      return React.createElement('input', {
        className: this.props.styles.native,
        disabled: this.props.disabled,
        name: this.props.name,
        type: 'hidden',
        value: this.getSelectedValue(this.state.selected) });
    }
  }]);

  return Select;
}(Component);

Select.defaultProps = {
  hasFixedWidth: false,
  hasUniqValues: true,
  isSearchable: false,
  noResults: 'No results found',
  onChange: noop,
  placeholder: '—',
  styleName: 'wrapper',
  styles: {}
};

Select.propTypes = {
  getHaystack: PropTypes.func,
  hasFixedWidth: PropTypes.bool,
  hasUniqValues: PropTypes.bool,
  isSearchable: PropTypes.bool,
  name: PropTypes.string.isRequired,
  noResults: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  renderOption: PropTypes.func,
  styleName: PropTypes.string,
  styles: PropTypes.shape({
    control: PropTypes.string.isRequired,
    empty: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    isClosedControl: PropTypes.string.isRequired,
    isClosedMenu: PropTypes.string.isRequired,
    isFixedItem: PropTypes.string.isRequired,
    isFixedMenu: PropTypes.string.isRequired,
    isFixedWrapper: PropTypes.string.isRequired,
    isFocusedItem: PropTypes.string.isRequired,
    isOpenedControl: PropTypes.string.isRequired,
    isOpenedMenu: PropTypes.string.isRequired,
    isSelectedItem: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    menu: PropTypes.string.isRequired,
    native: PropTypes.string.isRequired,
    wrapper: PropTypes.string
  })
};

module.exports = reactOutsideEvent(Select, ['click']);