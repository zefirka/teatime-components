'use strict';

const { Component, PropTypes } = require('react');
const { isUndefined, map, noop } = require('lodash/fp');
const Check = require('./Check');
const React = require('react');
const classNames = require('classnames');
const styleName = require('../tool2/styleName');

// {num: checked, ...} // удобно рендерить опции, работает с дубликатами
// _.invert

const defined = {
  s: require('../style/check-group/check-group-s.css'),
  m: require('../style/check-group/check-group-m.css'),
};

const style = styleName(defined, (defined, size) => defined[size]);

class CheckGroup extends Component {
  constructor(props) {
    super(props);

    const isControlled = !isUndefined(props.value);
    const value = isControlled
      ? props.value
      : props.defaultValue;

    this.state = {};
  }

  componentWillReceiveProps() {}

  onChange() {}

  render() {
    const {
      className,
      cols,
      options,
      size,
      styles,
      ...other,
    } = this.props;
// disabled, name, option, styles, size -> Check
    return (
      <div
        {...other}
        className={classNames(style('container', styles, size), className)}>
        {this.renderOptions()}
      </div>
    );
  }

  renderColumns() {}

  renderOptions() {
    const {
      disabled,
      name,
      size,
      styles,
    } = this.props;

    return map((option, pos) => (
      <Check
        {...option}
        disabled={disabled}
        key={pos}
        name={name}
        size={size}
        styles={styles}
      />
    ), this.props.options);
  }
}

CheckGroup.defaultProps = {
  onChange: noop,
  size: 's',
};

CheckGroup.propTypes = {
  cols: PropTypes.number,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  size: PropTypes.oneOf([
    's',
    'm',
  ]),
  styles: PropTypes.shape({
    column: PropTypes.string,
    container: PropTypes.string.isRequired,
    control: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    native: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired,
  }),
  value: PropTypes.arrayOf(PropTypes.string),
};

module.exports = CheckGroup;

// 'use strict';

// const { PropTypes } = require('react');
// const CheckGroup = require('../view/CheckGroup');

// const predefinedStyles = {
//   s: require('../style/check-group/check-group-s.css'),
//   m: require('../style/check-group/check-group-m.css'),
// };

// class CheckGroupComponent extends CheckGroup {
//   /**
//    * @return {object}
//    */
//   styles() {
//     return predefinedStyles[this.props.size];
//   }
// }

// CheckGroupComponent.defaultProps = {
//   size: 's',
//   ...CheckGroup.defaultProps,
// };

// CheckGroupComponent.propTypes = {
//   size: PropTypes.oneOf([
//     's',
//     'm',
//   ]),
//   ...CheckGroup.propTypes,
// };

// CheckGroupComponent.unwantedProps = [
//   'size',
//   ...CheckGroup.unwantedProps,
// ];

// module.exports = CheckGroupComponent;
