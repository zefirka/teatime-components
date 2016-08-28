'use strict';

const { Component, PropTypes } = require('react');
const { identity, isUndefined, noop } = require('lodash/fp');
const React = require('react');
const assert = require('../tool/assert');
const classNames = require('classnames');
const style = require('../tool/style');

const cn = style(identity, {
  xs: require('../style/input/input-xs.css'),
  s: require('../style/input/input-s.css'),
  m: require('../style/input/input-m.css'),
});

class Input extends Component {
  constructor(props) {
    super(props);

    this.controlled = !isUndefined(props.value);

    if (process.env.NODE_ENV !== 'production' && this.controlled) {
      assert(isUndefined(props.defaultValue), 'controlled');
    }

    this.state = {
      value: this.controlled
        ? props.value
        : props.defaultValue,
    };

    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // assert
    if (!this.controlled) return;
    this.setState({value: nextProps.value});
  }

  focus() {
    if (!this.refs.input) return;
    this.refs.input.focus();
  }

  select() {
    if (!this.refs.input) return;
    this.refs.input.select();
  }

  onChange(e) {
    const nextValue = e.target.value;
    if (!this.controlled) this.setState({value: nextValue});
    this.props.onChange(e, {value: nextValue});
  }

  onClear(e) {
    if (!this.controlled) this.setState({value: ''});
    this.props.onChange(e, {value: ''});
    this.focus();
  }

  render() {
    const {
      autocomplete,
      autofocus,
      className,
      defaultValue, // eslint-disable-line no-unused-vars
      disabled,
      id,
      maxlength,
      name,
      onChange, // eslint-disable-line no-unused-vars
      placeholder,
      readonly,
      size,
      styles,
      type,
      value, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    return (
      <span
        {...other}
        className={classNames(cn(styles, 'wrapper', size), className)}>
        <input
          autoComplete={autocomplete}
          autoFocus={autofocus}
          className={cn(styles, 'control', size)}
          disabled={disabled}
          id={id}
          maxLength={maxlength}
          name={name}
          onChange={this.onChange}
          placeholder={placeholder}
          readOnly={readonly}
          ref='input'
          type={type}
          value={this.state.value}/>
        {this.renderClear()}
      </span>
    );
  }

  // @todo
  // renderInput() {}

  renderClear() {
    if (this.props.disabled) return null;

    return (
      <span
        className={cn(this.props.styles, 'clear', this.props.size)}
        onClick={this.onClear}/>
    );
  }
}

Input.defaultProps = {
  onChange: noop,
  size: 's',
  type: 'text',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf([
    'xs',
    's',
    'm',
  ]),
  styles: PropTypes.shape({
    clear: PropTypes.string.isRequired,
    control: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired,
  }),
  type: PropTypes.oneOf([
    'password',
    'text',
  ]),
};

module.exports = Input;
