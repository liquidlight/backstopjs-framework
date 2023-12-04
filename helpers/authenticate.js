module.exports = async (page, scenario, viewport, isReference, Engine, config) => {
	if (config.httpAuth || scenario.httpAuth) {
		await page.authenticate(scenario.httpAuth ?? config.httpAuth);
	}
};
