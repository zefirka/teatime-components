'use strict';

const { Component, PropTypes } = require('react');
const { findIndex, isUndefined, noop } = require('lodash/fp');
const Check = require('../view/Check');
const React = require('react');
const classNames = require('classnames');
const generateId = require('../tool/generateId');
const style = require('../tool/style');

const cn = style((size, type) => type + '-' + size, {
  'button-l': require('../style/radio-group/radio-group-l.css'),
  'button-m': require('../style/radio-group/radio-group-m.css'),
  'button-s': require('../style/radio-group/radio-group-s.css'),
  'button-xs': require('../style/radio-group/radio-group-xs.css'),
  'common-l': null,
  'common-m': require('../style/radio/radio-m.css'),
  'common-s': require('../style/radio/radio-s.css'),
  'common-xs': null,
});

class Radio extends Component {
  constructor(props) {
    super(props);

    this.controlled = !isUndefined(props.value);

    const value = this.controlled
      ? props.value
      : props.defaultValue;

    this.state = {
      prefix: generateId(),
      selected: findIndex(props.options, option => option.value === value),
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.controlled) return;
    this.setState({value: nextProps.value});
  }

  onChange(e, _, position) {
    if (!this.controlled) {
      this.setState({
        selected: position,
      });
    }

    this.props.onChange(e, _, position);
  }

  render() {
    const {
      className,
      disabled,
      name,
      options,
      size,
      styles,
      type,
      ...other,
    } = this.props;

    const { prefix, selected } = this.state;

    const genericOptions = options.map((option, position) =>
      this.renderOption(option, {
        checked: selected === position,
        disabled,
        hasLabel: type === 'radio',
        key: prefix + option.value,
        name,
        onChange: this.onChange,
        position,
        styles: cn(styles, null, size, type),
        type: 'radio',
      }));

    return (
      <div
        {...other}
        className={classNames(cn(styles, 'container', size, type), className)}>
        {genericOptions}
      </div>
    );
  }

  renderOption(option, generic) {
    return (
      <Check
        {...option}
        {...generic}/>
    );
  }
}

Radio.defaultProps = {
  onChange: noop,
  size: 's',
  type: 'radio',
};

Radio.propTypes = {
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  size: PropTypes.oneOf([
    'l',
    'm',
    's',
    'xs',
  ]),
  styles: PropTypes.shape({
    container: PropTypes.string.isRequired,
    control: PropTypes.string.isRequired,
    label: PropTypes.string,
    native: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired,
  }),
  type: PropTypes.oneOf([
    'button',
    'common',
  ]),
  value: PropTypes.string,
};

module.exports = Radio;
