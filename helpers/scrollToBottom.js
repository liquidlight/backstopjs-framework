const scrollToBottom = require('scroll-to-bottomjs');

module.exports = async(page, config) => {
	if (config.scrollWholePageBeforeImage) {
		await page.evaluate(scrollToBottom);
	}
};
