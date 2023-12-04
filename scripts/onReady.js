const chalk = require('chalk');

module.exports = async (page, scenario, viewport, isReference, Engine, config) => {
	console.log(chalk.green(`🏃 [${scenario.label}] Running scenario: ${viewport.label}`));

	await require('../helpers/clickAndHover')(page, scenario, viewport, isReference, Engine, config);
	await require('../helpers/removeCssAnimations')(page, scenario, viewport, isReference, Engine, config);
	await require('../helpers/scrollToBottom')(page, scenario, viewport, isReference, Engine, config);
};
