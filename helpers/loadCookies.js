const fs = require('fs');
const chalk = require('chalk');
const puppeteer = require('puppeteer');

module.exports = async (page, scenario, viewport, isReference, Engine, config) => {

	if (
		config.loadCookies !== true &&
		scenario.loadCookies !== true
	) {
		return;
	}

	// Get the dir to store cookies
	const cookieDir = scenario.cookieDir ?? config.cookieDir;

	// Access the URL we are using
	const url = new URL(isReference ? scenario.referenceUrl : scenario.url);

	const cookiePath = `${cookieDir}cookies.${url.host}.json`;

	if (!fs.existsSync(cookiePath)) {
		console.log(chalk.red(`🍪 No cookie file found: ${cookiePath}`))
		return;
	}

	const cookieJson = await fs.readFileSync(cookiePath);
	const cookies = JSON.parse(cookieJson);
	await page.setCookie(...cookies);

	console.log(chalk.yellow(`🍪 [${scenario.label}] Restored cookies: ${JSON.stringify(cookies)}`));
};
