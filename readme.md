> Deprecated: use [BrightspaceUI/dropdown](https://github.com/BrightspaceUI/dropdown) web component instead.


# react-vui-dropdown 

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][dependencies-image]][dependencies-url]

A react component to display a dropdown menu.

## Installation

Install from NPM:
```shell
npm install react-vui-dropdown
```

Install from Bower:
```shell
bower install react-vui-dropdown
```

## Usage

Import the style:

```javascript
@import "bower_components/react-vui-dropdown/dropdown.scss"; // or...

@import "node_modules/react-vui-dropdown/dropdown.scss";
```

The dropdown takes the following properties:

* `text`: required, the text to be displayed in the dropdown button
* `isPrimary`: optional flag indicating whether opener is primary button
* `isTextVisible`: optional flag for whether the text is visible
* `disabled`: optional flag for whether the dropdown button is enabled
* `items`: optional array of items for the menu

```javascript
var dropdown = require('react-vui-dropdown'),
	ButtonMenu = dropdown.ButtonMenu,
	ContextMenu = dropdown.ContextMenu;

var items = [
	{ "text": "Action Item 1", "action": someFunction},
	{ "text": "Action Item 2", "action": someFunction, "isEnabled": false}
];

<ButtonMenu text="Stuff" items={items} />

<ButtonMenu text="Stuff" items={items} disabled />

<ContextMenu text="Stuff" items={items} />

```

## Contributing

### Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) rules and contributions should make use of them. See the [VUI Best Practices & Style Guide](https://github.com/Brightspace/valence-ui-docs/wiki/Best-Practices-&-Style-Guide) for more information.

[npm-url]: https://www.npmjs.org/package/react-vui-dropdown
[npm-image]: https://img.shields.io/npm/v/react-vui-dropdown.svg
[ci-url]: https://travis-ci.org/Brightspace/react-valence-ui-dropdown
[ci-image]: https://img.shields.io/travis-ci/Brightspace/react-valence-ui-dropdown.svg
[coverage-url]: https://coveralls.io/r/Brightspace/react-valence-ui-dropdown?branch=master
[coverage-image]: https://img.shields.io/coveralls/Brightspace/react-valence-ui-dropdown.svg
[dependencies-url]: https://david-dm.org/brightspace/react-valence-ui-dropdown
[dependencies-image]: https://img.shields.io/david/Brightspace/react-valence-ui-dropdown.svg
