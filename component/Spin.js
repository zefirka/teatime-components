'use strict';

const { Component, PropTypes } = require('react');
const { identity } = require('lodash/fp');
const React = require('react');
const classNames = require('classnames');
const style = require('../tool/style');

const cn = style(identity, {
  xs: require('../style/spin/spin-xs.css'),
  s: require('../style/spin/spin-s.css'),
  m: require('../style/spin/spin-m.css'),
  l: require('../style/spin/spin-l.css'),
  xl: require('../style/spin/spin-xl.css'),
});

class Spin extends Component {
  render() {
    const {
      className,
      size,
      styles,
      ...other,
    } = this.props;

    return (
      <span
        {...other}
        className={classNames(cn(styles, 'control', size), className)}/>
    );
  }
}

Spin.defaultProps = {
  size: 's',
};

Spin.propTypes = {
  size: PropTypes.oneOf([
    'xs',
    's',
    'm',
    'l',
    'xl',
  ]),
  styles: PropTypes.shape({
    control: PropTypes.string.isRequired,
  }),
};

module.exports = Spin;
