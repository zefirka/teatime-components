'use strict';

const { Component, PropTypes } = require('react');
const { identity, isUndefined, noop } = require('lodash/fp');
const React = require('react');
const classNames = require('classnames');
const generateId = require('../tool/generateId');
const style = require('../tool/style');

const cn = style(identity, {
  s: require('../style/check/check-s.css'),
  m: require('../style/check/check-m.css'),
});

class Check extends Component {
  /**
   * @param  {object} props
   * @param  {string} [props.id]
   * @return {void}
   */
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

  /**
   * @param  {object}  e
   * @param  {boolean} e.target.checked
   * @return {void}
   */
  onChange(e) {
    const { checked, value } = e.target;
    this.props.onChange(e, { checked, value });
  }

  render() {
    const {
      checked,
      children,
      className,
      defaultChecked,
      disabled,
      id, // eslint-disable-line no-unused-vars
      label,
      name,
      onChange, // eslint-disable-line no-unused-vars
      size,
      styles,
      type,
      value,
      ...other,
    } = this.props;

    return (
      <div
        {...other}
        className={classNames(cn(styles, 'wrapper', size), className)}>
        <input
          checked={checked}
          className={cn(styles, 'native', size)}
          defaultChecked={defaultChecked}
          disabled={disabled}
          id={this.state.id}
          name={name}
          onChange={this.onChange}
          type={type}
          value={value}/>
        <label
          className={cn(styles, 'control', size)}
          htmlFor={this.state.id}/>
        {this.renderLabel(isUndefined(label) ? children : label)}
      </div>
    );
  }

  /**
   * @param  {string} label
   * @return {react.element|null}
   */
  renderLabel(label) {
    if (isUndefined(label)) return null;

    return (
      <label
        className={cn(this.props.styles, 'label', this.props.size)}
        htmlFor={this.state.id}>
        {label}
      </label>
    );
  }
}

Check.defaultProps = {
  onChange: noop,
  size: 's',
  type: 'checkbox',
};

Check.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf([
    's',
    'm',
  ]),
  styles: PropTypes.shape({
    control: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    native: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired,
  }),
  type:  PropTypes.oneOf([
    'checkbox',
    'radio',
  ]),
};

module.exports = Check;
