var React = require('react'),
	Menu = require('./menu'),
	keys = require('./keys'),
	classNames = require('classnames');

var ButtonOpener = React.createClass({

	getDefaultProps: function() {
		return {
			disabled: false,
			isPrimary: false,
			isTextVisible: true,
			items: []
		};
	},

	getInitialState: function() {
		return {
			isMenuVisible: false
		};
	},

	closeMenu: function(focusOpener) {
		this.setState({
			isMenuVisible: false
		});
		if (focusOpener) {
			this.focus();
		}
	},

	focus: function() {
		var button = React.findDOMNode(this).querySelector('button');
		button.focus();
	},

	handleBlur: function() {
		// this trick is necessary due to lack of support for e.relatedTarget
		setTimeout(function() {

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

	handleKeyUp: function(e) {

		if ((e.keyCode !== keys.DOWN && e.keyCode !== keys.UP) || this.props.disabled) {
			return;
		}

		if (e.keyCode === keys.DOWN && !this.state.isMenuVisible) {
			this.setState({isMenuVisible: true});
		} else if (e.keyCode === keys.UP && this.state.isMenuVisible) {
			this.setState({isMenuVisible: false});
		}

	},

	handleKeyDown: function(e) {
		if (e.keyCode === keys.DOWN || e.keyCode === keys.UP) {
			// prevent scrolling when up/down arrows pressed
			e.preventDefault();
		}
	},

	toggleMenuVisibility: function() {
		if (this.props.disabled) {
			return;
		}
		this.setState({
			isMenuVisible: !this.state.isMenuVisible
		});
	},

	render: function() {

		var opener = React.createElement(
			'button', {
				key: 0,
				'aria-haspopup': 'true',
				className: this.props.className,
				disabled: this.props.disabled,
				onClick: this.toggleMenuVisibility,
				onKeyDown: this.handleKeyDown,
				onKeyUp: this.handleKeyUp
			},
			this.props.children
		);

		var menu = React.createElement(
			Menu, {
				key: 1,
				closeCallback: this.closeMenu,
				items: this.props.items,
				isVisible: this.state.isMenuVisible
			}
		);

		var className = classNames({
			'vui-dropdown' : true,
			'vui-dropdown-open': this.state.isMenuVisible
		});

		return React.createElement(
			'div', {
				className: className,
				onBlur: this.handleBlur
			},
			[ opener, menu ]
		);

	}

});

module.exports = ButtonOpener;
