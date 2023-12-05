const fs = require('fs');
const chalk = require('chalk');

module.exports = async(page, config, scenario, isReference) => {
	if (!config.loadCookies) {
		return;
	}

	// Access the URL we are using
	const url = new URL(isReference ? scenario.referenceUrl : scenario.url);

	const cookieFile = `cookies.${ url.host }.json`;
	const cookiePath = config.cookieDir + cookieFile;

	if (!fs.existsSync(cookiePath)) {
		console.log(chalk.red(`🍪 No cookie file found: ${cookieFile}`));
		return;
	}

	const cookieJson = await fs.readFileSync(cookiePath);
	const cookies = JSON.parse(cookieJson);
	await page.setCookie(...cookies);

	console.log(chalk.yellow(`🍪 [${scenario.label}] Restored cookies: ${JSON.stringify(cookies)}`));
};
