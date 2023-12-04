module.exports = async(page, scenario) => {
	if (scenario.httpAuth) {
		await page.authenticate(scenario.httpAuth);
	}
};
