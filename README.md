# BackstopJS Framework

This is a wrapper/meta framework around an already incredible library, [BackstopJS](https://github.com/garris/BackstopJS). At Liquid Light, we look after several websites - this is our centralised configuration for running BackstopJS.

It requires **1 file**, **1 dependency** and **1 .gitignore rule** adding to the site's repository - the rest is handled within these files & configuration.

This framework allows you to have minimal setup configuration for getting up and running with BackstopJS.

## Notes

- When running, this framework will put the relevant generated files in a `backstop` directory from wherever you run it, this can be configured if desired.
- We don't commit any generated screenshots - this is because content changes so often, it would be out of date. Instead, reference files are created at the beginning of the task.

## Installation

1. `npm i @liquidlight/backstopjs-framework --save-dev` - We don't want it installed in production
2. Create a `backstop.config.js` - this can either be in the root of your project or in a sub-directory if preferred
3. Add `backstop` to your `.gitignore` (or, if you have put it in a sub-directory add `./[subdir]/backstop`
4. **Optional** add the following to the `scripts` block in your `package.json` (don't forget to update the config path if you put it elsewhere)

```json
{
  "scripts": {
    "backstop:reference": "backstop reference --config='backstop.config.js'",
    "backstop:test": "backstop test --config='backstop.config.js'",
    "backstop:approve": "backstop approve --config='backstop.config.js'",
    "backstop:open": "backstop openReport --config='backstop.config.js'"
  }
}
```

**Note**: If desired, you can make a new `package.json` file _inside_ your sub-directory and keep it contained.

## Configuration

The `backstop.config.js` allows for configuring BackstopJS according to their configuration with some extra magic on top.

To get started, copy the below into your JavaScript file

```js
module.exports = require('@liquidlight/backstopjs-framework')(
	{
		// Domains
		domains: {
			// What URL is used for tests (usually development site)
			base: 'https://liquidlight.ddev.site/'
			// Optional: What URL is used for creating references (usually live)
			reference: 'https://www.liquidlight.co.uk/'
		},
	},
	[
		// What pages to test
	]
);

```


1. Create ref - `backstop:reference`
2. Create test - `backstop:test`
3. If you are happy with the changes - `backstop:approve`

## Config

`httpAuth`

`scrollWholePageBeforeImage`

`loadCookieUrl`

`cookieDir`

`removeCssAnimations`


## Make Cookies

```
node ./node_modules/@liquidlight/backstopjs-framework/createCookies.js
```
