
var React = require('react'),
	ButtonOpener = require('./button-opener'),
	classNames = require('classnames');

var ButtonMenu = React.createClass({

	getDefaultProps: function() {
		return {
			disabled: false,
			isPrimary: false,
			isTextVisible: true,
			items: []
		};
	},

	render: function() {

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

		return React.createElement(
			ButtonOpener, {
				className: buttonClass,
				disabled: this.props.disabled,
				items: this.props.items,
				openerType: 'vui-dropdown-button',
				menuProps: this.props.menuProps
			},
			React.createElement(
				'span', { className: contentClass },
				React.createElement(
					'span',
					{},
					this.props.text
				)
			)
		);

	}

});

module.exports = ButtonMenu;
