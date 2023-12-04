module.exports = async (page, scenario, viewport, isReference, Engine, config) => {
	await require('./../helpers/loadCookies')(page, scenario, viewport, isReference, Engine, config);
	await require('./../helpers/authenticate')(page, scenario, viewport, isReference, Engine, config);
};
