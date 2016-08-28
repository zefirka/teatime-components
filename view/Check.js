'use strict';

const { Component, PropTypes } = require('react');
const { get, isUndefined, noop } = require('lodash/fp');
const React = require('react');
const classNames = require('classnames');
const generateId = require('../tool/generateId');

class Check extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || generateId(),
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (isUndefined(nextProps.id)) return;
    this.setState(nextProps.id);
  }

  onChange(e) {
    const { checked, value } = e.target;
    this.props.onChange(e, { checked, value }, this.props.position);
  }

  render() {
    const {
      checked,
      children,
      className,
      disabled,
      hasLabel, // eslint-disable-line no-unused-vars
      id, // eslint-disable-line no-unused-vars
      label,
      name,
      onChange, // eslint-disable-line no-unused-vars
      position, // eslint-disable-line no-unused-vars
      styles,
      type,
      value,
      ...other,
    } = this.props;

    return (
      <div
        {...other}
        className={classNames(get('wrapper', styles), className)}>
        <input
          checked={checked}
          className={get('native', styles)}
          disabled={disabled}
          id={this.state.id}
          name={name}
          onChange={this.onChange}
          type={type}
          value={value}/>
        <label
          className={get('control', styles)}
          htmlFor={this.state.id}/>
        {this.renderLabel(isUndefined(label) ? children : label)}
      </div>
    );
  }

  renderLabel(label) {
    if (!this.props.hasLabel) return null;

    return (
      <label
        className={get('label', this.props.styles)}
        htmlFor={this.state.id}>
        {label}
      </label>
    );
  }
}

Check.defaultProps = {
  hasLabel: true,
  onChange: noop,
  type: 'checkbox',
};

Check.propTypes = {
  hasLabel: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  position: PropTypes.number,
  styles: PropTypes.shape({
    control: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    native: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired,
  }),
  type: PropTypes.oneOf([
    'checkbox',
    'radio',
  ]),
};

module.exports = Check;
