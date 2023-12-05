const getCustomConfig = require('./../utils/getCustomConfig');

module.exports = async(page, scenario, viewport, isReference, Engine, config) => {
	// Get our custom config
	const customConfig = getCustomConfig(config, scenario, isReference);

	// Should cookies be loaded?
	await require('./../helpers/loadCookies')(page, customConfig, scenario, isReference);

	// Do we need to authenticate with HTTP auth?
	await require('./../helpers/authenticate')(page, customConfig);
};
