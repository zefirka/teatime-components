'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('react'),
    Component = _require.Component,
    PropTypes = _require.PropTypes;

var _require2 = require('../tool/component'),
    bind = _require2.bind;

var _require3 = require('../tool/className'),
    classNames = _require3.classNames;

var Overlay = require('../view/Overlay');
var React = require('react');

var baseStyles = {
  'normal-xs': require('../style/tooltip/tooltip-normal-xs.css'),
  'normal-s': require('../style/tooltip/tooltip-normal-s.css'),
  'normal-m': require('../style/tooltip/tooltip-normal-m.css'),
  'success-xs': require('../style/tooltip/tooltip-success-xs.css'),
  'success-s': require('../style/tooltip/tooltip-success-s.css'),
  'success-m': require('../style/tooltip/tooltip-success-m.css'),
  'warning-xs': require('../style/tooltip/tooltip-warning-xs.css'),
  'warning-s': require('../style/tooltip/tooltip-warning-s.css'),
  'warning-m': require('../style/tooltip/tooltip-warning-m.css')
};

var height = {
  xs: 24,
  s: 28,
  m: 32
};

var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    bind(_this, ['calculatePosition', 'onPositionUpdate', 'shouldComponentUpdatePosition']);

    _this.state = {
      isMultiline: false
    };
    return _this;
  }

  /**
   * @param  {object} rect
   * @param  {number} rect.height
   * @param  {number} rect.left
   * @param  {number} rect.top
   * @param  {number} rect.width
   * @return {number}
   */


  _createClass(Tooltip, [{
    key: 'calculatePosition',
    value: function calculatePosition(rect) {
      if (this.props.direction === 'bottom' || this.props.direction === 'top') {
        return rect.top + (rect.left - rect.width / 2) / 10000;
      }

      return rect.top - rect.height / 2 + rect.left / 10000;
    }

    /**
     * @param  {object}  rect
     * @param  {number}  rect.height
     * @param  {number}  rect.width
     * @param  {number}  maxWidth
     * @return {boolean}
     */

  }, {
    key: 'isMultiline',
    value: function isMultiline(rect, maxWidth) {
      return rect.width * rect.height / maxWidth > height[this.props.size];
    }

    /**
     * @param  {object} rect
     * @param  {node}   ref
     */

  }, {
    key: 'onPositionUpdate',
    value: function onPositionUpdate(rect) {
      if (this.state.isMultiline !== this.isMultiline(rect, this.props.maxWidth)) {
        this.setState({
          isMultiline: !this.state.isMultiline
        });
      }
    }
  }, {
    key: 'shouldComponentUpdatePosition',
    value: function shouldComponentUpdatePosition(prevProps) {
      return prevProps.direction !== this.props.direction;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          direction = _props.direction,
          size = _props.size,
          type = _props.type;

      var styles = baseStyles[type + '-' + size];

      return React.createElement(
        Overlay,
        {
          className: classNames(className, styles[direction], (_classNames = {}, _defineProperty(_classNames, styles.isClosed, !children), _defineProperty(_classNames, styles.isOpened, children), _defineProperty(_classNames, styles.isLine, !this.state.isMultiline), _classNames)),
          onPositionUpdate: this.onPositionUpdate,
          shouldComponentUpdatePosition: this.shouldComponentUpdatePosition },
        children
      );
    }
  }]);

  return Tooltip;
}(Component);

Tooltip.defaultProps = {
  direction: 'right',
  maxWidth: 300,
  size: 's',
  type: 'normal'
};

Tooltip.propTypes = {
  direction: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  maxWidth: PropTypes.number,
  size: PropTypes.oneOf(['xs', 's', 'm']),
  type: PropTypes.oneOf(['normal', 'success', 'warning'])
};

module.exports = Tooltip;