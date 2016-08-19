'use strict';

const { Component, PropTypes } = require('react');
const { curry, get, isUndefined, noop } = require('lodash/fp');
const React = require('react');
const classNames = require('classnames');
const generateId = require('../tool2/generateId');

const defined = {
  s: require('../style/check/check-s.css'),
  m: require('../style/check/check-m.css'),
};

// @todo make common for all controls and put to the standalone module
// possible syntax:
// ```
// const style = require('./style')(defined, getter);
// style(size, theme, styles)(styleName)
// ```
const style = curry((defined, size, styles, styleName) =>
  get(styleName, isUndefined(styles) ? defined[size] : styles))(defined);

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

  /**
   * @param  {object}  e
   * @param  {boolean} e.target.checked
   * @return {void}
   */
  onChange(e) {
    this.props.onChange(e, {value: e.target.checked});
  }

  render() {
    const {
      children,
      className,
      defaultValue,
      disabled,
      id, // eslint-disable-line no-unused-vars
      label,
      name,
      size,
      styles,
      type,
      value,
      ...other,
    } = this.props;

    return (
      <div
        {...other}
        className={classNames(style(size, styles, 'wrapper'), className)}>
        <input
          checked={value}
          className={style(size, styles, 'native')}
          defaultChecked={defaultValue}
          disabled={disabled}
          id={this.state.id}
          name={name}
          onChange={this.onChange}
          type={type}/>
        <label
          className={style(size, styles, 'control')}
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
        className={style(this.props.size, this.props.styles, 'label')}
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
  defaultValue: PropTypes.bool,
  id: PropTypes.string,
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
  value: PropTypes.bool,
};

module.exports = Check;
