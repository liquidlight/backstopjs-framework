module.exports = require('..')(
	[
		{
			label: 'Liquid Light',
			envs: {
				test: {
					domain: 'https://liquidlight.ddev.site'
				},
				reference: {
					domain: 'https://www.liquidlight.co.uk'
				}
			},
			paths: [
				{
					label: 'Homepage',
					path: '/',
					cookiePath: './homepage.json'
				},
				{
					label: 'Blog',
					path: '/blog'
				}
			]
		},
		{
			label: 'TYPO3',
			envs: {
				test: {
					domain: 'https://typo3.com/',
					cookiePath: './typo3.json'
				}
			},
			paths: [
				{label: 'Homepage', path: '/'}
			]
		}
	]
);
