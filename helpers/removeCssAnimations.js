const merge = require('deepmerge');

module.exports = async (page, scenario, viewport, isReference, Engine, config) => {
	const mergedConfig = merge(config, scenario);

	if (mergedConfig.removeCssAnimations) {
		await page.addStyleTag({
			content: '*{animation-delay:-1ms!important;animation-duration:1ms!important;animation-iteration-count:1!important;background-attachment:initial!important;scroll-behavior:auto!important;transition-duration:0s!important;transition-delay:0s!important}'
		});
	}
};
