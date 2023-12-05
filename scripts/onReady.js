const chalk = require('chalk');
const getCustomConfig = require('./../utils/getCustomConfig');

module.exports = async(page, scenario, viewport, isReference, Engine, config) => {
	console.log(chalk.green(`🏃 [${scenario.label}] Running scenario: ${viewport.label}`));
	console.log(chalk.grey(isReference ? scenario.referenceUrl : scenario.url));

	// Get our custom config
	const customConfig = getCustomConfig(config, scenario, isReference);

	// Any clicks or interactions?
	await require('../helpers/clickAndHover')(page, scenario);

	// Should CSS animations be removed?
	await require('../helpers/removeCssAnimations')(page, customConfig);

	// Should the page scroll to the bottom
	await require('../helpers/scrollToBottom')(page, customConfig);
};
