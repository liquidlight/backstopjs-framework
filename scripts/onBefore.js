module.exports = async(page, scenario) => {
	await require('./../helpers/loadCookies')(page, scenario);
	await require('./../helpers/authenticate')(page, scenario);
};
