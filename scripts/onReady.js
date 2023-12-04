const chalk = require('chalk');

module.exports = async(page, scenario, vp) => {
	console.log(chalk.green(`🏃 [${scenario.label}] Running scenario: ${vp.label}`));

	await require('../helpers/clickAndHover')(page, scenario);
	await require('../helpers/removeCssAnimations')(page);
	await require('../helpers/scrollToBottom')(page, scenario);
};
