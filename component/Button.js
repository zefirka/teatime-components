'use strict';

const { Component, PropTypes } = require('react');
const { curry, get, isUndefined } = require('lodash/fp');
const React = require('react');
const classNames = require('classnames');

const defined = {
  'l-action': require('../style/button/button-action-l.css'),
  'l-link': require('../style/button/button-link-l.css'),
  'l-normal': require('../style/button/button-normal-l.css'),
  'm-action': require('../style/button/button-action-m.css'),
  'm-link': require('../style/button/button-link-m.css'),
  'm-normal': require('../style/button/button-normal-m.css'),
  's-action': require('../style/button/button-action-s.css'),
  's-link': require('../style/button/button-link-s.css'),
  's-normal': require('../style/button/button-normal-s.css'),
  'xs-action': require('../style/button/button-action-xs.css'),
  'xs-link': require('../style/button/button-link-xs.css'),
  'xs-normal': require('../style/button/button-normal-xs.css'),
};

// @todo make common for all controls and put to the standalone module
// possible syntax:
// ```
// const style = require('./style')(defined, getter);
// style(size, theme, styles)(styleName)
// ```
const style = curry((defined, size, theme, styles, styleName) =>
  get(styleName, isUndefined(styles) ? defined[size + '-' + theme] : styles))(defined);

class Button extends Component {
  focus() {
    if (this.refs.control) {
      this.refs.control.focus();
    }
  }

  render() {
    const {
      className,
      size,
      styles,
      theme,
      ...other,
    } = this.props;

    return (
      <button
        {...other}
        className={classNames(style(size, theme, styles, 'control'), className)}
        ref='control'/>
    );
  }
}

Button.defaultProps = {
  size: 's',
  theme: 'normal',
};

Button.propTypes = {
  size: PropTypes.oneOf([
    'l',
    'm',
    's',
    'xs',
  ]),
  styles: PropTypes.shape({
    control: PropTypes.string.isRequired,
  }),
  theme: PropTypes.oneOf([
    'action',
    'link',
    'normal',
  ]),
};

module.exports = Button;
