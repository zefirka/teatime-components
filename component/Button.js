'use strict';

const { Component, PropTypes } = require('react');
const React = require('react');
const classNames = require('classnames');
const styleName = require('../tool2/styleName');

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

const style = styleName(defined,
  (defined, size, theme) => defined[size + '-' + theme]);

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
        className={classNames(style('control', styles, size, theme), className)}
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
