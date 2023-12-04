const merge = require('deepmerge');
const scrollToBottom = require('scroll-to-bottomjs');

module.exports = async (page, scenario, viewport, isReference, Engine, config) => {
	const mergedConfig = merge(config, scenario);

	if (mergedConfig.scrollWholePageBeforeImage) {
		await page.evaluate(scrollToBottom);
	}
};
