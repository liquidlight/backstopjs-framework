const fs = require('fs');
const chalk = require('chalk');

module.exports = async(page, scenario) => {
	const cookiePath = scenario.cookiePath;

	if (scenario.loadCookies !== true || !fs.existsSync(cookiePath)) {
		return;
	}

	const cookieJson = await fs.readFileSync(cookiePath);
	const cookies = JSON.parse(cookieJson);
	await page.setCookie(...cookies);

	console.log(chalk.yellow(`🍪 [${scenario.label}] Restored cookies: ${JSON.stringify(cookies)}`));
};
