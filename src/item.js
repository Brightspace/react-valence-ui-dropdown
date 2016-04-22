var React = require('react'),
	classNames = require('classnames'),
	keys = require('./keys');

var Item = React.createClass( {

	getInitialState: function() {
		return {
			isFocused: false
		};
	},

	shouldComponentUpdate: function( nextProps, nextState ) {
		return this.state.isFocused !== nextState.isFocused;
	},

	handleFocus: function() {
		this.setState({ isFocused: true });
	},

	handleBlur: function() {
		this.setState({ isFocused: false });
	},

	handleKeyUp: function(e) {

		if (e.keyCode !== keys.SPACE || this.props.isEnabled === false) {
			return;
		}

		this.props.action();

	},

	render: function() {

		var isEnabled = (this.props.isEnabled !== false);

		var link = React.createElement(
			'a', {
				'aria-disabled': !isEnabled,
				href: 'javascript:void(0);',
				onClick: isEnabled ? this.props.action : null,
				onFocus: this.handleFocus,
				onMouseMove: this.handleFocus,
				onMouseLeave: this.handleBlur,
				onBlur: this.handleBlur,
				onKeyUp: this.handleKeyUp,
				tabIndex: -1
			},
			this.props.text
		);

		var itemClass = classNames({
			'vui-dropdown-menu-item': true,
			'vui-dropdown-menu-item-disabled': !isEnabled,
			'vui-dropdown-menu-item-focus': this.state.isFocused
		});

		return React.createElement(
			'li', {
				className: itemClass,
				role: 'menuitem'
			},
			link
		);

	}

} );

Item.tryGetFocusableElement = function(itemNode) {
	if (!itemNode.firstChild || !itemNode.firstChild.focus) {
		return false;
	}
	return itemNode.firstChild;
};

module.exports = Item;
