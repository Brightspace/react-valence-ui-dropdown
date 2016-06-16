
var React = require('react'),
	ReactDOM = require('react-dom'),
	Item = require('./item'),
	Separator = require('./separator'),
	classNames = require('classnames'),
	keys = require('./keys');

var Menu = React.createClass( {

	componentDidUpdate: function(prevProps) {
		if (!prevProps.isVisible && this.props.isVisible) {

			var menuElement = ReactDOM.findDOMNode(this);
			var menuRect = menuElement.getBoundingClientRect();

			var openerElement = menuElement.previousSibling;
			var openerRect = openerElement.getBoundingClientRect();

			var spaceBelow = document.documentElement.clientHeight - menuRect.top;
			if ((spaceBelow - menuRect.height) < 0) {
				if (openerRect.top > spaceBelow) {
					menuElement.className += ' vui-dropdown-menu-flip-x';
				}
			}

			if (document.body.getAttribute('dir') !== 'rtl') {
				var spaceRight = document.documentElement.clientWidth - openerRect.left;
				if ((spaceRight - menuRect.width) < 0) {
					if (openerRect.right > spaceRight) {
						menuElement.className += ' vui-dropdown-menu-flip-y';
					}
				}
			} else {
				if ((menuRect.right - menuRect.width) < 0) {
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

	getNextFocusable: function(node) {

		while (node.nextSibling) {
			var nextFocusable = Item.tryGetFocusableElement(node.nextSibling);
			if (nextFocusable) {
				return nextFocusable;
			}
			node = node.nextSibling;
		}

		return Item.tryGetFocusableElement(node.parentNode.firstChild);

	},

	getPreviousFocusable: function(node) {

		while (node.previousSibling) {
			var previousFocusable = Item.tryGetFocusableElement(node.previousSibling);
			if (previousFocusable) {
				return previousFocusable;
			}
			node = node.previousSibling;
		}

		return Item.tryGetFocusableElement(node.parentNode.lastChild);

	},

	handleKeyUp: function(e) {

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

	handleKeyDown: function(e) {
		if (e.keyCode === keys.DOWN || e.keyCode === keys.UP || e.keyCode === keys.SPACE) {
			// prevent scrolling when up/down arrows/space pressed
			e.preventDefault();
		}
	},

	itemKey: function(itemIndex, groupItemIndex) {
		return itemIndex + ':' + groupItemIndex;
	},

	render: function() {

		var menuClass = classNames({
			'vui-dropdown-menu': true,
			'vui-dropdown-menu-visible': this.props.isVisible
		});

		var items = this.props.items ? this.props.items : [];

		var createItemComponent = function(item, key) {

			return React.createElement(
				Item,	{
					key: key,
					action: function() {
						if (item.isEnabled === false) {
							return;
						}
						if (typeof this.props.menuProps !== 'object' || !!this.props.menuProps.autoClose) {
							this.props.closeCallback(true);
						}
						item.action();
					}.bind(this),
					isEnabled: item.isEnabled,
					text: item.text,
					ownProps: item.ownProps
				}
			);
		}.bind(this);

		var itemComponents = items.map(function(item, itemIndex) {

			if (item.constructor === Array) {
				return item.map(function(groupItem, groupItemIndex) {
					if (itemIndex !== items.length - 1 && groupItemIndex === item.length - 1) {
						return [
							createItemComponent(groupItem, this.itemKey(itemIndex, groupItemIndex)),
							React.createElement(Separator)
						];
					} else {
						return createItemComponent(groupItem, this.itemKey(itemIndex, groupItemIndex));
					}
				}.bind(this));
			} else {
				return createItemComponent(item, this.itemKey(itemIndex, 0));
			}

		}.bind(this));

		var menuProps = {
			className: menuClass,
			onKeyDown: this.handleKeyDown,
			onKeyUp: this.handleKeyUp,
			role: 'menu'
		};

		if (typeof this.props.menuProps === 'object') {
			for (var k in this.props.menuProps) {
				menuProps[k] = this.props.menuProps[k];
			}
		}

		return React.createElement(
			'div',
			menuProps,
			React.createElement(
				'ul', {},
				itemComponents
			)
		);

	}

} );

module.exports = Menu;
