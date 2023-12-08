const merge = require('deepmerge');

const backstopConfigurationDefaults = require('./configuration/backstop');
const customConfigurationDefaults = require('./configuration/custom');

module.exports = (
	sites = [],
	backstop = {}
) => {
	// Set default options based on configuration and merge with what is passed in
	let backstopConfiguration = merge.all([
		backstopConfigurationDefaults,
		customConfigurationDefaults,
		backstop
	]);

	// Add our passed in config to global so we can access if we want
	// backstopConfiguration.extended = sites;

	// Have we configured using the extension
	if (sites.length) {
		// Loop through each site sites
		for(let site of sites) {
			// Process the domain name
			let testEnv = site.envs.test,
				referenceEnv = testEnv;
			if (Object.prototype.hasOwnProperty.call(site.envs, 'reference')) {
				// Get our reference env
				referenceEnv = site.envs.reference;
			} else {
				// Set reference as exactly the same as test
				site.envs.reference = site.envs.test;
			}
			// Loop through URLs
			for (let url of site.paths) {
				/**
				 * Domains
				 */
				// Set the base url
				url.label = (site.label ? site.label + ' - ' : '') + url.label;
				// Set the base url
				url.url = testEnv.domain.replace(/\/$/, '') + url.path;
				// Set the reference URL with the domain
				url.referenceUrl = referenceEnv.domain.replace(/\/$/, '') + url.path;
				// Delete 'path' (not used by BackstopJS)
				delete url.path;

				let localSite = {...site};
				delete localSite.paths;
				url.site = localSite;

				// Set the URL as a scenario
				backstopConfiguration.scenarios.push(url);
			}
		}
	}

	return backstopConfiguration;
};
