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
					path: '/'
				}
			]
		},
		{
			label: 'TYPO3',
			envs: {
				test: {
					domain: 'https://typo3.com/'
				}
			},
			paths: [
				{label: 'Homepage', path: '/'}
			]
		}
	]
);
