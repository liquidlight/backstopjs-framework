const customConfigurationDefaults = require('./../configuration/custom');

module.exports = async(config, scenario, isReference) => {
	// Use our custom defaults
	let output = customConfigurationDefaults,
		// Get the env based on the reference
		env = (isReference ? scenario.site.envs.reference : scenario.site.envs.test);

	// For each of the config keys in the custom config
	for (let configKey in customConfigurationDefaults) {
		// Has it been overwritten in the main Backstop Config?
		if (Object.prototype.hasOwnProperty.call(config, configKey)) {
			output[configKey] = config[configKey];
		}

		// Has it been overwritten in the site object?
		if (Object.prototype.hasOwnProperty.call(scenario.site, configKey)) {
			output[configKey] = scenario.site[configKey];
		}

		// Has it been overwritten in the current environment?
		if (Object.prototype.hasOwnProperty.call(env, configKey)) {
			output[configKey] = env[configKey];
		}

		// Has it been overwritten in the scenario
		if (Object.prototype.hasOwnProperty.call(scenario, configKey)) {
			output[configKey] = scenario[configKey];
		}
	}

	return output;
};
