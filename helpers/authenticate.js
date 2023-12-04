const merge = require('deepmerge');

module.exports = async (page, scenario, viewport, isReference, Engine, config) => {
	const mergedConfig = merge(config, scenario);

	if (mergedConfig.httpAuth) {
		await page.authenticate(mergedConfig.httpAuth);
	}
};
