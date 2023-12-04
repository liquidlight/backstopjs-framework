const scrollToBottom = require('scroll-to-bottomjs');

module.exports = async(page, scenario) => {
	// Scroll to the bottom so lazy loaded images load
	if (scenario.scrollWholePageBeforeImage) {
		await page.evaluate(scrollToBottom);
	}
};
