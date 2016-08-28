'use strict';

const { Component, PropTypes } = require('react');
const { identity, isUndefined, noop } = require('lodash/fp');
const React = require('react');
const classNames = require('classnames');
const generateId = require('../tool/generateId');
const style = require('../tool/style');

const cn = style(identity, {
  xs: require('../style/tumbler/tumbler-xs.css'),
  s: require('../style/tumbler/tumbler-s.css'),
  m: require('../style/tumbler/tumbler-m.css'),
});

class Tumbler extends Component {
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
    this.props.onChange(e, { checked, value });
  }

  render() {
    const {
      checked,
      className,
      defaultChecked,
      disabled,
      name,
      off,
      on,
      size,
      styles,
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
          type='checkbox'
          value={value}/>
        <label
          className={cn(styles, 'control', size)}
          htmlFor={this.state.id}>
          <span className={cn(styles, 'label', size)}>{on}</span>
          <span className={cn(styles, 'label', size)}>{off}</span>
          <span className={cn(styles, 'delimiter', size)}>&nbsp;</span>
        </label>
      </div>
    );
  }
}

Tumbler.defaultProps = {
  off: 'Off',
  on: 'On',
  onChange: noop,
  size: 'xs',
};

Tumbler.propTypes = {
  name: PropTypes.string.isRequired,
  off: PropTypes.string,
  on: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf([
    'xs',
    's',
    'm',
  ]),
  styles: PropTypes.shape({
    control: PropTypes.string.isRequired,
    delimiter: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    native: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired,
  }),
};

module.exports = Tumbler;
