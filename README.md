# BackstopJS Framework

This is a wrapper/meta framework around an already incredible library, [BackstopJS](https://github.com/garris/BackstopJS). At Liquid Light, we look after several websites - this is our centralised configuration for running BackstopJS.

It requires **1 file**, **1 dependency** and **1 .gitignore rule** adding to the site's repository - the rest is handled within these files & configuration.

This framework allows you to have minimal setup configuration for getting up and running with BackstopJS.

- [BackstopJS Framework](#backstopjs-framework)
	- [Concepts](#concepts)
	- [Notes](#notes)
	- [Usage](#usage)
	- [Extra Configuration](#extra-configuration)
		- [HTTP Auth](#http-auth)
		- [Scroll Whole Page](#scroll-whole-page)
		- [Remove CSS Animations](#remove-css-animations)
	- [Cookie Path](#cookie-path)
	- [Installation](#installation)
	- [Configuration File](#configuration-file)
		- [Minimal Configuration](#minimal-configuration)
		- [Expanded Configuration](#expanded-configuration)
	- [Generate Cookies](#generate-cookies)

## Concepts

This package introduces a sense of hierarchy to testing URLs as you may have a repo which controls many sites which you want to test all or some. You may also wish to reference the live URL while testing the dev site.

The configuration hierarchy & nomenclature  is as follows.

1. The main BackstopJS configuration
2. Sites
3. Site environments
4. Paths

The paths are used for both Test and Reference domains so live parallel to the Environments object

To help give some context, here are some scenarios, with where you would put the config

- You may wish to remove all css animations on all sites (Global BackstopJS config)
- You have HTTP auth on your reference domain (reference ENV config)
- You want to load cookies for both test and reference domains (site config)
- You want to scroll to the bottom on a particular page (path config)

Under the hood, the reference and test domains are merged with paths into backstop scenarios.

## Notes

- When running, this framework will put the relevant generated files in a `backstop` directory from wherever you run it, this can be configured if desired.
- We don't commit any generated screenshots - this is because content changes so often, it would be out of date. Instead, reference files are created at the beginning of the task.

## Usage

Once [installed](#installation), the usage is the same as the main library - however as you install it locally with scripts, you run `npm run XXX`

1. First, create reference files from the reference domain (if specified, otherwise the test) with `npm run backstop:reference`
1. Next, create a test against your test domain `npm run backstop:test`
2. You can view the results with `npm run backstop:open` - Auto open is disabled so it doesn't interrupt your workflow.
3. If you are doing incremental changes, you may wish to make the current test images the new reference ones, in which case you can run  `npm run backstop:approve`

## Extra Configuration

Along with the standard configuration included, this framework adds a few more options. These can either be placed in the global BackstopJS config, on the site, domain or even path level, depending on the granularity of the config option required.

### HTTP Auth

- **Option:** `httpAuth: (object)`
- **Default:** `false`

Does the site or web page have a HTTP auth login? If so, you pass a username & password

E.g.

```
httpAuth: {
	username: 'username',
	password: 'p4ssw0rd'
}
```

### Scroll Whole Page

- **Option:** `scrollWholePageBeforeImage: (bool)`
- **Default:** `false`

Should the whole page be scrolled before the screenshot is taken? Useful if you have lazy loaded images or JS scroll animations

### Remove CSS Animations

- **Option:** `removeCssAnimations: (bool)`
- **Default:** `true`

Should all CSS transition & animations be removed - useful for ensuring all your elements are static and visible

## Cookie Path

- **Option:** `cookiePath: (string)`
- **Default:** `false`

Although this option can be placed in scenarios, this framework allows it to be set globally and within a site or environment.

## Installation

1. `npm i @liquidlight/backstopjs-framework -D --save` - We don't want it installed in production
2. Create a `backstop.config.js` - this can either be in the root of your project or in a sub-directory if preferred - see the [configuration file](#configuration-file) section for how this works
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

## Configuration File

The `backstop.config.js` allows for configuring BackstopJS according to their configuration with some extra magic on top.

The basis of the configuration file is as follows:

```js
module.exports = require('@liquidlight/backstopjs-framework')(
	[], // Liquid light path & domain magic
	{} // Standard Backstop JS configuration
);
```

You can choose to pass nothing in to the first array, in which case you can use the standard BackstopJS configuration with the second object.

### Minimal Configuration

To get started, copy the below into your JavaScript file - this is a minimal configuration. Duplicate the paths object for each page. If you want to test a second URL, then duplicate the whole site object

```js
module.exports = require('@liquidlight/backstopjs-framework')([
	{
		envs: {
			test: {
				domain: 'https://www.liquidlight.co.uk',
				// Other config
			},
		},
		paths: [
			{
				label: 'Homepage',
				path: '/',
				// Other config
			}
		],
	}
]);
```

### Expanded Configuration

```js
module.exports = require('@liquidlight/backstopjs-framework')(
	[
		{
			label: 'Liquid Light',
			// Other config
			envs: {
				test: {
					domain: 'https://liquidlight.ddev.site',
					// Other config
				},
				reference: {
					domain: 'https://www.liquidlight.co.uk',
					// Other config
				},
			},
			paths: [
				{
					label: 'Homepage',
					path: '/',
					// Other config
				}
			],
		},
		{
			label: 'TYPO3',
			envs: {
				test: {
					domain: 'https://typo3.com/'
				},
			},
			paths: [
				{
					label: 'Homepage',
					path: '/',
				}
			],
		}
	],
	{
		// Backstop configuration
	}
);
```


## Generate Cookies

You may wish to save cookies for one of the domain names configured, in which case run the following. This will use your backstop config to find the domains and cookie paths.

It will open a browser for you to carry out the actions which create the cookies and then save them

```bash
./node_modules/.bin/save-cookies --config='backstop.config.js'
```

If your project requires cookies to test, you could add the following to your `npm` scripts:

```
{
  "scripts": {
    "backstop:cookies": "save-cookies --config='backstop.config.js'",
  }
}
```
