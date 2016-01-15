
var React = require('react'),
	Item = require('./item'),
	Separator = require('./separator'),
	classNames = require('classnames'),
	keys = require('./keys');

var Menu = React.createClass( {

	componentDidUpdate: function(prevProps) {
		if (!prevProps.isVisible && this.props.isVisible) {

			var firstItem = React.findDOMNode(this).querySelector('ul > li');
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
		if (e.keyCode === keys.DOWN || e.keyCode === keys.UP) {
			// prevent scrolling when up/down arrows pressed
			e.preventDefault();
		}
	},

	render: function() {

		var menuClass = classNames({
			'vui-dropdown-menu': true,
			'vui-dropdown-menu-visible': this.props.isVisible
		});

		var items = this.props.items ? this.props.items : [];

		var createItemComponent = function(item) {
			return React.createElement(
				Item, {
					action: function() {
						if (item.isEnabled === false) {
							return;
						}
						this.props.closeCallback(true);
						item.action();
					}.bind(this),
					isEnabled: item.isEnabled,
					text: item.text
				}
			);
		}.bind(this);

		var itemComponents = items.map(function(item, itemIndex) {

			if (item.constructor === Array) {
				return item.map(function(groupItem, groupItemIndex) {
					if (itemIndex !== items.length - 1 && groupItemIndex === item.length - 1) {
						return [
							createItemComponent(groupItem),
							React.createElement(Separator)
						];
					} else {
						return createItemComponent(groupItem);
					}
				}.bind(this));
			} else {
				return createItemComponent(item);
			}

		}.bind(this));

		return React.createElement(
			'div', {
				className: menuClass,
				onKeyDown: this.handleKeyDown,
				onKeyUp: this.handleKeyUp,
				role: 'menu'
			},
			React.createElement(
				'ul', {},
				itemComponents
			)
		);

	}

} );

module.exports = Menu;
