'use strict';

const { Component, PropTypes } = require('react');
const { identity, noop } = require('lodash/fp');
const React = require('react');
const classNames = require('classnames');
const style = require('../tool/style');

const cn = style(identity, {
  s: require('../style/textarea/textarea-s.css'),
  m: require('../style/textarea/textarea-m.css'),
});

class Textarea extends Component {
  focus() {
    if (!this.refs.textarea) return;
    this.refs.textarea.focus();
  }

  select() {
    if (!this.refs.textarea) return;
    this.refs.textarea.select();
  }

  onChange(e) {
    this.props.onChange(e, {value: e.target.value});
  }

  render() {
    const {
      className,
      size,
      styles,
      ...other,
    } = this.props;

    return (
      <textarea
        {...other}
        className={classNames(cn(styles, 'control', size), className)}
        ref='textarea'/>
    );
  }
}

Textarea.defaultProps = {
  onChange: noop,
  size: 's',
  rows: 3,
};

Textarea.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf([
    's',
    'm',
  ]),
  styles: PropTypes.shape({
    control: PropTypes.string.isRequired,
  }),
};

module.exports = Textarea;
