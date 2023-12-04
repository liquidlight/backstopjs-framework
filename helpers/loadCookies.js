const fs = require('fs');
const chalk = require('chalk');
const merge = require('deepmerge');

module.exports = async (page, scenario, viewport, isReference, Engine, config) => {
	const mergedConfig = merge(config, scenario);

	if (!mergedConfig.loadCookies) {
		return;
	}

	// Access the URL we are using
	const url = new URL(isReference ? scenario.referenceUrl : scenario.url);

	const cookieFile = `cookies.${ url.host }.json`;
	const cookiePath = mergedConfig.cookieDir + cookieFile;

	if (!fs.existsSync(cookiePath)) {
		console.log(chalk.red(`🍪 No cookie file found: ${cookieFile}`))
		return;
	}

	const cookieJson = await fs.readFileSync(cookiePath);
	const cookies = JSON.parse(cookieJson);
	await page.setCookie(...cookies);

	console.log(chalk.yellow(`🍪 [${scenario.label}] Restored cookies: ${JSON.stringify(cookies)}`));
};
