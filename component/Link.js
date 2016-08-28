'use strict';

const { Component, PropTypes } = require('react');
const React = require('react');
const classNames = require('classnames');
const style = require('../tool/style');

const cn = style((size, theme) => size + '-' + theme, {
  'l-action': require('../style/link/link-action-l.css'),
  'l-link': require('../style/link/link-link-l.css'),
  'l-normal': require('../style/link/link-normal-l.css'),
  'm-action': require('../style/link/link-action-m.css'),
  'm-link': require('../style/link/link-link-m.css'),
  'm-normal': require('../style/link/link-normal-m.css'),
  's-action': require('../style/link/link-action-s.css'),
  's-link': require('../style/link/link-link-s.css'),
  's-normal': require('../style/link/link-normal-s.css'),
  'xs-action': require('../style/link/link-action-xs.css'),
  'xs-link': require('../style/link/link-link-xs.css'),
  'xs-normal': require('../style/link/link-normal-xs.css'),
});

class Link extends Component {
  render() {
    const {
      className,
      size,
      styles,
      theme,
      ...other,
    } = this.props;

    return (
      <a
        {...other}
        className={classNames(cn(styles, 'control', size, theme), className)}/>
    );
  }
}

Link.defaultProps = {
  size: 's',
  theme: 'link',
};

Link.propTypes = {
  size: PropTypes.oneOf([
    'xs',
    's',
    'm',
    'l',
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

module.exports = Link;
