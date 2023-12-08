const fs = require('fs');
const chalk = require('chalk');

module.exports = async(page, config, scenario) => {
	if (!config.cookiePath) {
		return;
	}

	if (!fs.existsSync(config.cookiePath)) {
		console.log(chalk.red(`🍪 No cookie file found: ${config.cookiePath}`));
		return;
	}

	const cookieJson = await fs.readFileSync(config.cookiePath);
	const cookies = JSON.parse(cookieJson);
	await page.setCookie(...cookies);

	console.log(chalk.yellow(`🍪 [${scenario.label}] Restored cookies: ${JSON.stringify(cookies)}`));
};
