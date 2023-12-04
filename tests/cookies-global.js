module.exports = require('..')(
	{
		domains: {
			base: 'https://www.liquidlight.co.uk/'
		},

		backstop: {
			loadCookies: true
		}
	},
	[
		{
			label: 'Home',
			path: '/'
		}
	]
);
