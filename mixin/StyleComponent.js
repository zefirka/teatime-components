'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

/**
 * @param  {component} Target
 * @param  {function} getter
 * @param  {object} styles
 * @param  {object} defaults defaultProps
 * @param  {object} types propTypes
 * @return {component}
 */

module.exports = function StyleComponent(Target, getter, styles, defaults, types) {
  var Simplified = function (_Component) {
    _inherits(Simplified, _Component);

    function Simplified() {
      _classCallCheck(this, Simplified);

      return _possibleConstructorReturn(this, (Simplified.__proto__ || Object.getPrototypeOf(Simplified)).apply(this, arguments));
    }

    _createClass(Simplified, [{
      key: 'render',
      value: function render() {
        return React.createElement(Target, _extends({}, this.props, getter(styles, this.props)));
      }
    }]);

    return Simplified;
  }(Component);

  Simplified.displayName = 'Styled' + (Target.displayName || 'Component');
  Simplified.defaultProps = defaults;
  Simplified.propTypes = types;

  return Simplified;
};