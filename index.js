const merge = require('deepmerge');

const scenarioConfigurationDefaults = require('./configuration/url');
const backstopConfigurationDefaults = require('./configuration/backstop');

module.exports = (
	configuration = {
		domains: {
			base: 'https://www.liquidlight.co.uk/'
		},
		scenarios: {},
		backstop: {}
	},
	urls = []
) => {

	// Set default options based on configuration and merge with what is passed in
	let scenarioConfiguration = merge(scenarioConfigurationDefaults, configuration.scenarios ?? {});
	let backstopConfiguration = merge(backstopConfigurationDefaults, configuration.backstop ?? {});

	// Are we passing URLs with shortcut ref?
	if(urls.length) {
		// Override all configured scenarios if using the shortcut
		backstopConfiguration.scenarios = [];

		// Process the domain name
		let referenceDomain = configuration.domains.base;
		if (Object.prototype.hasOwnProperty.call(configuration.domains, 'reference')) {
			referenceDomain = configuration.domains.reference;
		}

		// Loop through URLs
		for (let url of urls) {
			/**
			 * Domains
			 */
			// Set the base url
			url.url = configuration.domains.base + url.path;
			// Set the reference URL with the domain
			url.referenceUrl = referenceDomain + url.path;
			// Delete 'path' (not used by BS)
			delete url.path;

			// Set the URL as a scenario
			backstopConfiguration.scenarios.push(merge(url, scenarioConfiguration));
		}

	}

	return backstopConfiguration;
};
