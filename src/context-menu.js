
var React = require('react'),
	ButtonOpener = require('./button-opener');

var ContextMenu = React.createClass({

	render: function() {

		if (!this.props.text || this.props.text.length === 0) {
			console.error("'text' is a required property of ContextMenu."); //eslint-disable-line no-console
			return;
		}

		return React.createElement(
			ButtonOpener, {
				className: 'vui-context-menu',
				disabled: this.props.disabled,
				items: this.props.items,
				openerType: 'vui-dropdown-context',
				menuProps: this.props.menuProps
			},
			React.createElement(
				'span',
				{},
				this.props.text
			)
		);

	}

});

module.exports = ContextMenu;
