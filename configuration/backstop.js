const path = require('path');

module.exports = {
	viewports: [
		{
			name: 'Mobile',
			width: 412,
			height: 915
		},
		{
			name: 'Desktop',
			width: 1700,
			height: 800
		}
	],

	onBeforeScript: './onBefore.js',
	onReadyScript: './onReady.js',

	paths: {
		engine_scripts: path.join(
			__dirname,
			'./../scripts'
		),

		bitmaps_reference: process.cwd() + '/backstop/bitmaps_reference',
		bitmaps_test: process.cwd() + '/backstop/bitmaps_test',
		html_report: process.cwd() + '/backstop/html_report',
		ci_report: process.cwd() + '/backstop/ci_report'
	},

	report: [
		// 'browser'
		// 'CI'
	],

	scenarios: [],

	engine: 'puppeteer',
	engineOptions: {
		headless: 'new',
		args: [
			'--no-sandbox'
		]
	},

	asyncCaptureLimit: 5,
	asyncCompareLimit: 50,

	debug: false,
	debugWindow: false
};
