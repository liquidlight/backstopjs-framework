#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs');
const inquirer = require('inquirer');
const parseArgs = require('minimist');
const path = require('path');
const puppeteer = require('puppeteer');

const main = async() => {
	// Get the config file passed in
	const argsOptions = parseArgs(process.argv.slice(2), {
		string: ['config'],
		default: {
			config: 'backstop.json'
		}
	});

	// Catch errors from failing promises
	process.on('unhandledRejection', function(error) {
		console.error(error && error.stack);
	});

	// Cache the process directory
	let cwd = process.cwd(),
		// Calculate the backstop file path
		backstopConfigFileName = path.isAbsolute(argsOptions.config) ? argsOptions.config : path.join(cwd, argsOptions.config);

	// Load the backstop config
	let userConfig = require(backstopConfigFileName);

	// Set some default vars
	let domains = [],
		cookiePaths = [
			(userConfig.paths.engine_scripts + '/cookies.json').replace(cwd, './')
		];

	// Has a global cookie path been defined?
	if (Object.prototype.hasOwnProperty.call(userConfig, 'cookiePath')) {
		cookiePaths.push(userConfig.cookiePath);
	}

	// Loop through each scenario
	for (let scenario of userConfig.scenarios) {
		// Set an empty var
		let url = '';

		for (let property of ['url', 'referenceUrl']) {
			// Has a URL or Reference URL been defined
			if (Object.prototype.hasOwnProperty.call(scenario, property)) {
				// Parse the URL to get the root
				url = new URL(scenario[property]);
				// Add to domain
				domains.push(url.origin);
			}
		}

		// Has a custom cookiePath been defined?
		if (Object.prototype.hasOwnProperty.call(scenario, 'cookiePath')) {
			cookiePaths.push(scenario.cookiePath);
		}

		// Has a custom cookiePath been defined?
		if (Object.prototype.hasOwnProperty.call(scenario, 'site')) {
			if (Object.prototype.hasOwnProperty.call(scenario.site, 'cookiePath')) {
				cookiePaths.push(scenario.site.cookiePath);
			}
			for (let env in scenario.site.envs) {
				if (Object.prototype.hasOwnProperty.call(scenario.site.envs[env], 'cookiePath')) {
					cookiePaths.push(scenario.site.envs[env].cookiePath);
				}
			}
		}
	}

	// Remove duplicate domains
	domains = [...new Set(domains)];
	// Remove duplicate cookiePaths and set as relative
	cookiePaths = [...new Set(cookiePaths)];

	console.log(chalk.yellow('🍪 Welcome to the cookie collector'));

	// Get which domain to collect cookis for
	let domain = await inquirer.prompt({
		type: 'list',
		name: 'url',
		message: 'Which URL would you like to save cookies for?',
		choices: domains
	}).then(res => res.url);

	console.log(chalk.white('🖥️ A browser will now open, please login and/or do the actions to generate the cookies. (it may take some time'));
	console.log(chalk.yellow('> Return to the CLI once you have finished'));

	// Create a new puppeteer browser
	const browser = await puppeteer.launch({
		// Change to `false` if you want to open the window
		headless: false
	});

	// Create a new browser page
	const page = await browser.newPage();

	// Go to the URL
	await page.goto(domain);

	// Ask the user if they have finished
	let saveCookies = await inquirer.prompt({
		type: 'confirm',
		name: 'continue',
		message: 'Do you want to save the current cookies?'
	}).then(res => res.continue);

	// Collect the page cookies
	let pageCookies = await page.cookies();

	// Close the browser
	browser.close();

	// Exit if we have nothing
	if(!saveCookies) {
		return;
	}

	console.log(chalk.yellow(`${pageCookies.length} cookie${pageCookies.length == 1 ? '' : 's'} found for ${domain}`));

	// Get the cookie path
	let cookiePath = await inquirer.prompt({
		type: 'list',
		name: 'url',
		message: 'Where would you like to save the cookies?',
		choices: cookiePaths
	}).then(res => res.url);

	// If the file exists already
	if (fs.existsSync(cookiePath)) {
		// Load the cookies
		let existingCookies = fs.readFileSync(cookiePath, 'utf8');

		// Merge with new cookies
		pageCookies = [
			...pageCookies,
			...JSON.parse(existingCookies)
		];
	}

	// Save the cookies
	await fs.writeFileSync(cookiePath, JSON.stringify(pageCookies));

	console.log(chalk.yellow(`Cookies saved in ${cookiePath}`));
};

main();
