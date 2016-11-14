'use strict';

var reactOutsideEvent = require('react-outside-event');

/**
 * @param  {component} Target
 * @param  {string[]} events
 * @return {component}
 */
module.exports = function ReactOutsideEvent(Target, events) {
  var WrappedComponent = reactOutsideEvent(Target, events);
  WrappedComponent.displayName = (Target.displayName || Target.name) + 'WithROEListener';
  return WrappedComponent;
};