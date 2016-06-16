'use strict';

jest.dontMock('../../src/item');

var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react-addons-test-utils'),
	keys = require('../../src/keys'),
	Item = require('../../src/item');

describe('item', function() {

	it('has class name', function() {

		var item = TestUtils.renderIntoDocument(
			<Item />
		);

		expect(ReactDOM.findDOMNode(item).className)
			.toBe('vui-dropdown-menu-item');

	});

	it('has the menuitem aria role', function() {

		var item = TestUtils.renderIntoDocument(
			<Item />
		);

		expect(ReactDOM.findDOMNode(item).getAttribute('role'))
			.toBe('menuitem');

	});

	it('has the disabled class when disabled', function() {

		var item = TestUtils.renderIntoDocument(
			<Item isEnabled={false} />
		);

		expect(ReactDOM.findDOMNode(item).className)
			.toBe('vui-dropdown-menu-item vui-dropdown-menu-item-disabled');

	});

	it('has the aria-disabled attribute false when item is enabled', function() {

		var item = TestUtils.renderIntoDocument(
			<Item />
		);

		expect(ReactDOM.findDOMNode(item).firstChild.getAttribute('aria-disabled'))
			.toBe('false');

	});

	it('has the aria-disabled attribute true when item is not enabled', function() {

		var item = TestUtils.renderIntoDocument(
			<Item isEnabled={false} />
		);

		expect(ReactDOM.findDOMNode(item).firstChild.getAttribute('aria-disabled'))
			.toBe('true');

	});

	it('has the focus class when it gets focus', function() {

		var item = TestUtils.renderIntoDocument(
			<Item />
		);

		TestUtils.Simulate.focus(
			ReactDOM.findDOMNode(item).firstChild,
		);

		expect(ReactDOM.findDOMNode(item).className)
			.toBe('vui-dropdown-menu-item vui-dropdown-menu-item-focus');

	});

	it('has loses the focus class when it blurs', function() {

		var item = TestUtils.renderIntoDocument(
			<Item />
		);

		TestUtils.Simulate.focus(
			ReactDOM.findDOMNode(item).firstChild,
		);

		expect(ReactDOM.findDOMNode(item).className)
			.toBe('vui-dropdown-menu-item vui-dropdown-menu-item-focus');

		TestUtils.Simulate.blur(
			ReactDOM.findDOMNode(item).firstChild,
		);

		expect(ReactDOM.findDOMNode(item).className)
			.toBe('vui-dropdown-menu-item');

	});

	it('does not call action when space key is pressed if item is disabled', function() {

		var called = false;
		var actionCallback = function() {
			called = true;
		}

		var item = TestUtils.renderIntoDocument(
			<Item isEnabled={false} action={actionCallback} />
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(item).firstChild,
			{keyCode: keys.SPACE}
		);

		expect(called).toBe(false);

	});

	it('does call action when space key is pressed if item is enabled', function() {

		var called = false;
		var actionCallback = function() {
			called = true;
		}

		var item = TestUtils.renderIntoDocument(
			<Item isEnabled={true} action={actionCallback} />
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(item).firstChild,
			{keyCode: keys.SPACE}
		);

		expect(called).toBe(true);

	});

});
