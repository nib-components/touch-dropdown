var events = require('event');
var emitter = require('emitter');
var merge = require('./lib/merge');
var TouchSubMenu = require('./lib/TouchSubMenu');

/**
 * Touch menu
 * @param       {Object} options
 * @constructor
 */
function TouchMenu(options) {
  var self = this;

  //the default options
  var defaults = {
    menuSelector: '.submenu'
  };

  //cache the options
  this.options = merge(defaults, options);

  //cache the elements
  this.el = options.el;

  //cache the menus
  this.menus = [];

  /**
   * Called when a sub-menu is opened
   */
  function onSubMenuOpen() {
    clearTimeout(self.closeTimeout);
    self.closeAllMenusExcept(this);
  }

  //initialise the menus
  var menuElements = document.querySelectorAll(this.options.menuSelector);
  for (var i=0; i<menuElements.length; ++i) {

    //create the sub menu
    var menu = new TouchSubMenu({
      el: menuElements[i]
    });

    //listen to the sub menu events
    menu.on('open', onSubMenuOpen);

    //add the menu to our list of menus
    this.menus.push(menu);

  }

  /*
   * If the user didn't click on *this* menu then close all the sub-menus because they're interacting with something
   * else on the page
   */
  events.bind(document, 'touchend', function(event) {

    var isChildOfMenu = false;
    var el = event.target;
    while (el) {
      if (el === self.el) {
        isChildOfMenu = true;
        break;
      }
      el = el.parentNode;
    }

    if (!isChildOfMenu) {
      self.closeAllMenusExcept(null);
    }

  });

}

/**
 * Closes all menus except the specified menu
 * @param   {Object} menu
 */
TouchMenu.prototype.closeAllMenusExcept = function(menu) {
  for (var i=0; i<this.menus.length; ++i) {
    if(this.menus[i] !== menu) {
      this.menus[i].close();
    }
  }
};

module.exports = TouchMenu;