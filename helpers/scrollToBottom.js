const scrollToBottom = require('scroll-to-bottomjs');

module.exports = async (page, scenario, viewport, isReference, Engine, config) => {
	// Scroll to the bottom so lazy loaded images load
	if (config.httpAuth || scenario.scrollWholePageBeforeImage) {
		await page.evaluate(scrollToBottom);
	}
};
