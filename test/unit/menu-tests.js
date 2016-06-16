'use strict';

jest.dontMock('../../src/menu');
jest.dontMock('../../src/item');

var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react-addons-test-utils'),
	keys = require('../../src/keys'),
	Menu = require('../../src/menu');

describe('menu', function() {

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

	var itemGroups = [[
		{
			text: 'First menu item',
			action: testAction
		}
	],[
		{
			text: 'Second menu item',
			action: testAction
		}
	]];

	it('has class name', function() {

		var menu = TestUtils.renderIntoDocument(
			<Menu />
		);

		expect(ReactDOM.findDOMNode(menu).className)
			.toBe('vui-dropdown-menu');

	});

	it('has the menu aria role', function() {

		var menu = TestUtils.renderIntoDocument(
			<Menu />
		);

		expect(ReactDOM.findDOMNode(menu).getAttribute('role'))
			.toBe('menu');

	});

	it('is not visible when isVisible prop is false', function() {

		var menu = TestUtils.renderIntoDocument(
			<Menu isVisible={false}/>
		);

		expect(ReactDOM.findDOMNode(menu).className)
			.toBe('vui-dropdown-menu');

	});

	it('is visible when isVisible prop is true', function() {

		var menu = TestUtils.renderIntoDocument(
			<Menu isVisible={true}/>
		);

		expect(ReactDOM.findDOMNode(menu).className)
			.toBe('vui-dropdown-menu vui-dropdown-menu-visible');

	});

	it('calls closeCallback when escape key is pressed', function() {

		var called = false;
		var closeCallback = function() {
			called = true;
		};

		var menu = TestUtils.renderIntoDocument(
			<Menu closeCallback={closeCallback} isVisible={true}/>
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(menu),
			{keyCode: keys.ESCAPE}
		);

		expect(called).toBe(true);

	});

	it('focuses on next item when down key is pressed', function() {

		var menu = TestUtils.renderIntoDocument(
			<Menu items={items} isVisible={true}/>
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(menu).firstChild.childNodes[0].firstChild,
			{keyCode: keys.DOWN}
		);

		// todo: expectation missing because jest is causing trouble

	});

	it('focuses on first item when down key is pressed on last item', function() {

		var menu = TestUtils.renderIntoDocument(
			<Menu items={items} isVisible={true}/>
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(menu).firstChild.childNodes[1].firstChild,
			{keyCode: keys.DOWN}
		);

		// todo: expectation missing because jest is causing trouble

	});

	it('focuses on previous item when up key is pressed', function() {

		var menu = TestUtils.renderIntoDocument(
			<Menu items={items} isVisible={true}/>
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(menu).firstChild.childNodes[1].firstChild,
			{keyCode: keys.UP}
		);

		// todo: expectation missing because jest is causing trouble

	});

	it('focuses on first item when up key is pressed on first item', function() {

		var menu = TestUtils.renderIntoDocument(
			<Menu items={items} isVisible={true}/>
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(menu).firstChild.childNodes[0].firstChild,
			{keyCode: keys.UP}
		);

		// todo: expectation missing because jest is causing trouble

	});

	it('calls closeCallback when item is actioned', function() {

		var called = false;
		var closeCallback = function() {
			called = true;
		};

		var menu = TestUtils.renderIntoDocument(
			<Menu closeCallback={closeCallback} items={items} isVisible={true}/>
		);

		TestUtils.Simulate.click(
			ReactDOM.findDOMNode(menu).firstChild.childNodes[0].firstChild
		);

		expect(called).toBe(true);

	});

	it('does not call closeCallback when disabled item is actioned', function() {

		var called = false;
		var closeCallback = function() {
			called = true;
		};

		var menu = TestUtils.renderIntoDocument(
			<Menu closeCallback={closeCallback} items={items} isVisible={true}/>
		);

		TestUtils.Simulate.click(
			ReactDOM.findDOMNode(menu).firstChild.childNodes[1].firstChild
		);

		expect(called).toBe(false);

	});

	it('renders separator between item groups', function() {

		var menu = TestUtils.renderIntoDocument(
			<Menu items={itemGroups} isVisible={true}/>
		);

		expect(ReactDOM.findDOMNode(menu).firstChild.childNodes[1].getAttribute('role')).toBe('separator');


	});

});
