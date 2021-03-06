'use strict';

const { Component, PropTypes } = require('react');
const { styleName } = require('../tool/className');
const React = require('react');

class Button extends Component {
  focus() {
    if (this.refs.control) {
      this.refs.control.focus();
    }
  }

  render() {
    return (
      <button {...this.props} className={styleName(this.props)} ref='control'/>
    );
  }
}

Button.defaultProps = {
  styleName: 'control',
  styles: {},
};

Button.propTypes = {
  styleName: PropTypes.string,
  styles: PropTypes.shape({
    control: PropTypes.string,
  }),
};

module.exports = Button;
