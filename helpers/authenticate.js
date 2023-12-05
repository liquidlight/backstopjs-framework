module.exports = async(page, config) => {
	if (config.httpAuth) {
		await page.authenticate(config.httpAuth);
	}
};
