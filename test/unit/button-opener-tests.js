'use strict';

jest.dontMock('../../src/button-opener');
jest.dontMock('../../src/menu');
jest.dontMock('../../src/item');

var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react-addons-test-utils'),
	keys = require('../../src/keys'),
	ButtonOpener = require('../../index').ButtonOpener;

describe('button-opener', function() {

	var testAction = function() {

	};

	var items = [
		{
			text: 'First menu item',
			action: testAction
		},
		{
			text: 'Second menu item',
			isEnabled: false,
			action: testAction
		}
	];

	it('has class name', function() {

		var buttonOpener = TestUtils.renderIntoDocument(
			<ButtonOpener text="Stuff" className="test-opener" items={items}/>
		);

		expect(ReactDOM.findDOMNode(buttonOpener).className)
			.toBe('vui-dropdown');

		expect(ReactDOM.findDOMNode(buttonOpener).firstChild.className)
			.toBe('test-opener');

	});

	it('has aria haspopup attribute', function() {

		var buttonOpener = TestUtils.renderIntoDocument(
			<ButtonOpener text="Stuff" />
		);

		expect(ReactDOM.findDOMNode(buttonOpener).firstChild.getAttribute('aria-haspopup'))
			.toBe('true');

	});

	it('has hidden menu', function() {

		var buttonOpener = TestUtils.renderIntoDocument(
			<ButtonOpener text="Stuff" />
		);

		expect(buttonOpener.state.isMenuVisible).toBe(false);

	});

	it('opens when mouse is clicked', function() {

		var buttonOpener = TestUtils.renderIntoDocument(
			<ButtonOpener text="Stuff" />
		);

		TestUtils.Simulate.click(
			ReactDOM.findDOMNode(buttonOpener).firstChild
		);

		expect(buttonOpener.state.isMenuVisible).toBe(true);

	});

	it('does not open when disabled button is clicked', function() {

		var buttonOpener = TestUtils.renderIntoDocument(
			<ButtonOpener text="Stuff" disabled />
		);

		TestUtils.Simulate.click(
			ReactDOM.findDOMNode(buttonOpener).firstChild
		);

		expect(buttonOpener.state.isMenuVisible).toBe(false);

	});

	it ('opens when down arrow is pressed', function() {

		var buttonOpener = TestUtils.renderIntoDocument(
			<ButtonOpener text="Stuff" />
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(buttonOpener).firstChild,
			{keyCode: keys.DOWN}
		);

		expect(buttonOpener.state.isMenuVisible).toBe(true);

	});

	it ('does not open if disabled and down arrow is pressed', function() {

		var buttonOpener = TestUtils.renderIntoDocument(
			<ButtonOpener text="Stuff" disabled />
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(buttonOpener).firstChild,
			{keyCode: keys.DOWN}
		);

		expect(buttonOpener.state.isMenuVisible).toBe(false);

	});

	it ('does not open if disabled and toggleMenuVisibility is called', function() {

		var buttonOpener = TestUtils.renderIntoDocument(
			<ButtonOpener text="Stuff" disabled />
		);

		buttonOpener.toggleMenuVisibility();

		expect(buttonOpener.state.isMenuVisible).toBe(false);

	});

	it ('closes when up arrow is pressed', function() {

		var buttonOpener = TestUtils.renderIntoDocument(
			<ButtonOpener text="Stuff" />
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(buttonOpener).firstChild,
			{keyCode: keys.DOWN}
		);

		expect(buttonOpener.state.isMenuVisible).toBe(true);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(buttonOpener).firstChild,
			{keyCode: keys.UP}
		);

		expect(buttonOpener.state.isMenuVisible).toBe(false);

	});

	it('closes when escape key is pressed', function() {

		var buttonOpener = TestUtils.renderIntoDocument(
			<ButtonOpener text="Stuff" items={items}/>
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(buttonOpener).firstChild,
			{keyCode: keys.DOWN}
		);

		expect(buttonOpener.state.isMenuVisible).toBe(true);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(buttonOpener).childNodes[1],
			{keyCode: keys.ESCAPE}
		);

		expect(buttonOpener.state.isMenuVisible).toBe(false);

	});

});
