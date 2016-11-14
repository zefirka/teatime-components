'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('react'),
    Component = _require.Component,
    PropTypes = _require.PropTypes;

var _require2 = require('../tool/identity'),
    generateId = _require2.generateId;

var _require3 = require('../tool/func'),
    noop = _require3.noop;

var React = require('react');

var MOUNTED_OVERLAYS = {};

var pendingUpdate;

var Overlay = function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay(props) {
    _classCallCheck(this, Overlay);

    var _this = _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this, props));

    _this.state = {
      id: generateId()
    };
    return _this;
  }

  _createClass(Overlay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      MOUNTED_OVERLAYS[this.state.id] = this;
      debouncedUpdate();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.shouldComponentUpdatePosition(prevProps, prevState)) {
        updateOverlays();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      delete MOUNTED_OVERLAYS[this.state.id];
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', _extends({}, this.props, { ref: 'overlay' }));
    }
  }]);

  return Overlay;
}(Component);

Overlay.defaultProps = {
  calculatePosition: calculatePosition,
  onPositionUpdate: noop,
  shouldComponentUpdatePosition: noop
};

Overlay.propTypes = {
  calculatePosition: PropTypes.func,
  onPositionUpdate: PropTypes.func,
  shouldComponentUpdatePosition: PropTypes.func
};

module.exports = Overlay;

/**
 * @param  {object} rect
 * @param  {number} rect.left
 * @param  {number} rect.top
 * @return {number}
 */
function calculatePosition(rect) {
  return rect.top + rect.left / 10000;
}

function debouncedUpdate() {
  clearTimeout(pendingUpdate);
  pendingUpdate = setTimeout(updateOverlays);
}

function updateOverlays() {
  clearTimeout(pendingUpdate);

  var layers = [];

  var component;
  var rect;
  var ref;

  for (var id in MOUNTED_OVERLAYS) {
    component = MOUNTED_OVERLAYS[id];

    if (!component.refs.overlay) {
      continue;
    }

    ref = component.refs.overlay;
    rect = ref.getBoundingClientRect();

    layers.push({
      component: component,
      pos: component.props.calculatePosition(rect),
      rect: rect,
      ref: ref
    });
  }

  layers.sort(byPos);

  var index = layers.length;
  var target;

  while (index--) {
    target = layers[index];
    target.ref.style.zIndex = 100 + index;
    target.component.props.onPositionUpdate(target.rect, target.ref);
  }
}

/**
 * @param  {object} a
 * @param  {number} a.pos
 * @param  {object} b
 * @param  {number} b.pos
 * @return {number}
 */
function byPos(a, b) {
  return b.pos - a.pos;
}