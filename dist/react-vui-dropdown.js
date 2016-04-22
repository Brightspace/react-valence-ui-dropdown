(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.reactVuiDropdown = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var dropdown = {
	ButtonOpener: require('./src/button-opener'),
	ButtonMenu: require('./src/button-menu'),
	ContextMenu: require('./src/context-menu')
};

module.exports = dropdown;

},{"./src/button-menu":3,"./src/button-opener":4,"./src/context-menu":5}],2:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],3:[function(require,module,exports){

var React = require('react'),
    ButtonOpener = require('./button-opener'),
    classNames = require('classnames');

var ButtonMenu = React.createClass({

	getDefaultProps: function () {
		return {
			disabled: false,
			isPrimary: false,
			isTextVisible: true,
			items: []
		};
	},

	render: function () {

		if (!this.props.text || this.props.text.length === 0) {
			console.error("'text' is a required property of ButtonMenu."); //eslint-disable-line no-console
			return;
		}

		var buttonClass = classNames({
			'vui-button-menu': true,
			'vui-button-menu-primary': this.props.isPrimary
		});

		var contentClass = classNames({
			'vui-button-menu-content': true,
			'vui-button-menu-text-hidden': !this.props.isTextVisible
		});

		return React.createElement(ButtonOpener, {
			className: buttonClass,
			disabled: this.props.disabled,
			items: this.props.items
		}, React.createElement('span', { className: contentClass }, React.createElement('span', {}, this.props.text)));
	}

});

module.exports = ButtonMenu;

},{"./button-opener":4,"classnames":2,"react":"react"}],4:[function(require,module,exports){
var React = require('react'),
    Menu = require('./menu'),
    keys = require('./keys'),
    classNames = require('classnames');

var ButtonOpener = React.createClass({

	getDefaultProps: function () {
		return {
			disabled: false,
			isPrimary: false,
			isTextVisible: true,
			items: []
		};
	},

	getInitialState: function () {
		return {
			isMenuVisible: false
		};
	},

	closeMenu: function (focusOpener) {
		this.setState({
			isMenuVisible: false
		});
		if (focusOpener) {
			this.focus();
		}
	},

	focus: function () {
		var button = React.findDOMNode(this).querySelector('button');
		button.focus();
	},

	handleBlur: function () {
		// this trick is necessary due to lack of support for e.relatedTarget
		setTimeout(function () {

			if (!this.state.isMenuVisible || !document.activeElement) {
				return;
			}

			var parentNode = document.activeElement.parentNode;
			var menuNode = React.findDOMNode(this);

			while (parentNode) {
				if (parentNode === menuNode) {
					return;
				}
				parentNode = parentNode.parentNode;
			}

			this.closeMenu(false);
		}.bind(this), 0);
	},

	handleKeyUp: function (e) {

		if (e.keyCode !== keys.DOWN && e.keyCode !== keys.UP || this.props.disabled) {
			return;
		}

		if (e.keyCode === keys.DOWN && !this.state.isMenuVisible) {
			this.setState({ isMenuVisible: true });
		} else if (e.keyCode === keys.UP && this.state.isMenuVisible) {
			this.setState({ isMenuVisible: false });
		}
	},

	handleKeyDown: function (e) {
		if (e.keyCode === keys.DOWN || e.keyCode === keys.UP) {
			// prevent scrolling when up/down arrows pressed
			e.preventDefault();
		}
	},

	toggleMenuVisibility: function () {
		if (this.props.disabled) {
			return;
		}
		this.setState({
			isMenuVisible: !this.state.isMenuVisible
		});
	},

	render: function () {

		var opener = React.createElement('button', {
			key: 0,
			'aria-haspopup': 'true',
			className: this.props.className,
			disabled: this.props.disabled,
			onClick: this.toggleMenuVisibility,
			onKeyDown: this.handleKeyDown,
			onKeyUp: this.handleKeyUp
		}, this.props.children);

		var menu = React.createElement(Menu, {
			key: 1,
			closeCallback: this.closeMenu,
			items: this.props.items,
			isVisible: this.state.isMenuVisible
		});

		var className = classNames({
			'vui-dropdown': true,
			'vui-dropdown-open': this.state.isMenuVisible
		});

		return React.createElement('div', {
			className: className,
			onBlur: this.handleBlur
		}, [opener, menu]);
	}

});

module.exports = ButtonOpener;

},{"./keys":7,"./menu":8,"classnames":2,"react":"react"}],5:[function(require,module,exports){

var React = require('react'),
    ButtonOpener = require('./button-opener');

var ContextMenu = React.createClass({

	render: function () {

		if (!this.props.text || this.props.text.length === 0) {
			console.error("'text' is a required property of ContextMenu."); //eslint-disable-line no-console
			return;
		}

		return React.createElement(ButtonOpener, {
			className: 'vui-context-menu',
			disabled: this.props.disabled,
			items: this.props.items
		}, React.createElement('span', {}, this.props.text));
	}

});

module.exports = ContextMenu;

},{"./button-opener":4,"react":"react"}],6:[function(require,module,exports){
var React = require('react'),
    classNames = require('classnames'),
    keys = require('./keys');

var Item = React.createClass({

	getInitialState: function () {
		return {
			isFocused: false
		};
	},

	shouldComponentUpdate: function (nextProps, nextState) {
		return this.state.isFocused !== nextState.isFocused;
	},

	handleFocus: function () {
		this.setState({ isFocused: true });
	},

	handleBlur: function () {
		this.setState({ isFocused: false });
	},

	handleKeyUp: function (e) {

		if (e.keyCode !== keys.SPACE || this.props.isEnabled === false) {
			return;
		}

		this.props.action();
	},

	render: function () {

		var isEnabled = this.props.isEnabled !== false;

		var link = React.createElement('a', {
			'aria-disabled': !isEnabled,
			href: 'javascript:void(0);',
			onClick: isEnabled ? this.props.action : null,
			onFocus: this.handleFocus,
			onMouseMove: this.handleFocus,
			onMouseLeave: this.handleBlur,
			onBlur: this.handleBlur,
			onKeyUp: this.handleKeyUp,
			tabIndex: -1
		}, this.props.text);

		var itemClass = classNames({
			'vui-dropdown-menu-item': true,
			'vui-dropdown-menu-item-disabled': !isEnabled,
			'vui-dropdown-menu-item-focus': this.state.isFocused
		});

		return React.createElement('li', {
			className: itemClass,
			role: 'menuitem'
		}, link);
	}

});

Item.tryGetFocusableElement = function (itemNode) {
	if (!itemNode.firstChild || !itemNode.firstChild.focus) {
		return false;
	}
	return itemNode.firstChild;
};

module.exports = Item;

},{"./keys":7,"classnames":2,"react":"react"}],7:[function(require,module,exports){
module.exports = {
	ENTER: 13,
	ESCAPE: 27,
	SPACE: 32,
	UP: 38,
	DOWN: 40
};

},{}],8:[function(require,module,exports){

var React = require('react'),
    Item = require('./item'),
    Separator = require('./separator'),
    classNames = require('classnames'),
    keys = require('./keys');

var Menu = React.createClass({

	componentDidUpdate: function (prevProps) {
		if (!prevProps.isVisible && this.props.isVisible) {

			var menuElement = React.findDOMNode(this);
			var menuRect = menuElement.getBoundingClientRect();

			var openerElement = menuElement.previousSibling;
			var openerRect = openerElement.getBoundingClientRect();

			var spaceBelow = document.documentElement.clientHeight - menuRect.top;
			if (spaceBelow - menuRect.height < 0) {
				if (openerRect.top > spaceBelow) {
					menuElement.className += ' vui-dropdown-menu-flip-x';
				}
			}

			if (document.body.getAttribute('dir') !== 'rtl') {
				var spaceRight = document.documentElement.clientWidth - openerRect.left;
				if (spaceRight - menuRect.width < 0) {
					if (openerRect.right > spaceRight) {
						menuElement.className += ' vui-dropdown-menu-flip-y';
					}
				}
			} else {
				if (menuRect.right - menuRect.width < 0) {
					var spaceRightRTL = document.documentElement.clientWidth - openerRect.left;
					if (spaceRightRTL > openerRect.right) {
						menuElement.className += ' vui-dropdown-menu-flip-y';
					}
				}
			}

			var firstItem = menuElement.querySelector('ul > li');
			if (!firstItem) {
				return;
			}

			Item.tryGetFocusableElement(firstItem).focus();
		}
	},

	getNextFocusable: function (node) {

		while (node.nextSibling) {
			var nextFocusable = Item.tryGetFocusableElement(node.nextSibling);
			if (nextFocusable) {
				return nextFocusable;
			}
			node = node.nextSibling;
		}

		return Item.tryGetFocusableElement(node.parentNode.firstChild);
	},

	getPreviousFocusable: function (node) {

		while (node.previousSibling) {
			var previousFocusable = Item.tryGetFocusableElement(node.previousSibling);
			if (previousFocusable) {
				return previousFocusable;
			}
			node = node.previousSibling;
		}

		return Item.tryGetFocusableElement(node.parentNode.lastChild);
	},

	getHoverFocusable: function (node) {
		var hoverFocusable = Item.tryGetFocusableElement(node);

		if (!hoverFocusable) {
			return node;
		}

		return hoverFocusable;
	},

	handleKeyUp: function (e) {

		if (e.keyCode !== keys.DOWN && e.keyCode !== keys.UP && e.keyCode !== keys.ESCAPE) {
			return;
		}

		var parentNode = e.target.parentNode;
		if (e.keyCode === keys.DOWN) {
			this.getNextFocusable(parentNode).focus();
		} else if (e.keyCode === keys.UP) {
			this.getPreviousFocusable(parentNode).focus();
		} else if (e.keyCode === keys.ESCAPE) {
			this.props.closeCallback(true);
		}

		return;
	},

	handleKeyDown: function (e) {
		if (e.keyCode === keys.DOWN || e.keyCode === keys.UP) {
			// prevent scrolling when up/down arrows pressed
			e.preventDefault();
		}
	},

	handleMouseEnter: function (e) {
		this.getHoverFocusable(e.target).focus();
	},

	render: function () {

		var menuClass = classNames({
			'vui-dropdown-menu': true,
			'vui-dropdown-menu-visible': this.props.isVisible
		});

		var items = this.props.items ? this.props.items : [];

		var createItemComponent = function (item, index) {

			return React.createElement(Item, {
				key: index,
				action: function () {
					if (item.isEnabled === false) {
						return;
					}
					this.props.closeCallback(true);
					item.action();
				}.bind(this),
				isEnabled: item.isEnabled,
				text: item.text
			});
		}.bind(this);

		var itemComponents = items.map(function (item, itemIndex) {

			if (item.constructor === Array) {
				return item.map(function (groupItem, groupItemIndex) {
					if (itemIndex !== items.length - 1 && groupItemIndex === item.length - 1) {
						return [createItemComponent(groupItem, itemIndex), React.createElement(Separator)];
					} else {
						return createItemComponent(groupItem);
					}
				}.bind(this));
			} else {
				return createItemComponent(item, itemIndex);
			}
		}.bind(this));

		return React.createElement('div', {
			className: menuClass,
			onKeyDown: this.handleKeyDown,
			onKeyUp: this.handleKeyUp,
			onMouseMove: this.handleMouseEnter,
			role: 'menu'
		}, React.createElement('ul', {}, itemComponents));
	}

});

module.exports = Menu;

},{"./item":6,"./keys":7,"./separator":9,"classnames":2,"react":"react"}],9:[function(require,module,exports){
var React = require('react');

var Separator = React.createClass({

	render: function () {

		return React.createElement('li', {
			className: 'vui-dropdown-menu-item-separator',
			role: 'separator'
		});
	}

});

module.exports = Separator;

},{"react":"react"}]},{},[1])(1)
});
//# sourceMappingURL=react-vui-dropdown.js.map
