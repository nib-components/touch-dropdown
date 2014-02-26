var events = require('event');
var emitter = require('emitter');
var merge = require('./merge');

/**
 * What happens if touch events are enabled part way through? Or if the user switches between mouse and touch?
 */

/**
 * Touch sub menu
 * @param       {Object} options
 * @constructor
 */
function TouchSubMenu(options) {

  //set the default options
  var defaults = {
    triggerSelector: '.nav-more',
    submenuSelector: '.submenu > ul',
    openClass: 'hover'
  };

  //cache the options
  this.options  = merge(defaults, options);

  //cache the elements
  this.el       = this.options.el;
  this.trigger  = this.el.querySelector(this.options.triggerSelector);
  this.submenu  = this.el.querySelector(this.options.submenuSelector);

  //bind events
  events.bind(this.trigger, 'touchend', this.onTouch.bind(this));

  //reset the touch count
  this.touchCount = 0;

};
emitter(TouchSubMenu.prototype);

/**
 * Gets whether the menu is open
 * @return  {Boolean}
 */
TouchSubMenu.prototype.isOpen = function() {
  return this.submenu.classList.contains(this.options.openClass);
};

/**
 * Open the submenu
 */
TouchSubMenu.prototype.open = function() {
  this.submenu.classList.add(this.options.openClass);
  this.emit('open');
  return this;
};

/**
 * Close the submenu
 */
TouchSubMenu.prototype.close = function() {
  this.submenu.classList.remove(this.options.openClass);
  this.touchCount = 0;
  this.emit('close');
  return this;
};

/**
 * Handles the touch event
 */
TouchSubMenu.prototype.onTouch = function(event) {

  //record the number of touches
  ++this.touchCount;

  if (this.touchCount === 1) {

    //open or hide the menu
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }

    //prevent other events
    event.preventDefault();

  } else {

    //let the touch event e.g. link click continue and reset the touch count
    this.touchCount = 0;

  }

};

module.exports = TouchSubMenu;