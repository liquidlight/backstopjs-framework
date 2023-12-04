// Require packages
const puppeteer = require('puppeteer');
const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');

const start = async () => {
	console.log(chalk.yellow('🍪 Welcome to the cookie exporter'));
	console.log('This allows you to export cookies for use with Backstop');

	let input = await inquirer.prompt({
		type: 'input',
		name: 'url',
		message: 'What is the URL you want to get cookies for?'
	}).then(res => res.url)

	let url = new URL(input);

	console.log(chalk.white('🖥️ A browser will now open, please login and/or do the actions to generate the cookies.'));
	console.log(chalk.yellow('> Return to the CLI once completed'));

	// Create a new puppeteer browser
	const browser = await puppeteer.launch({
		// Change to `false` if you want to open the window
		headless: false,
	});

	// Create a new browser page
	const page = await browser.newPage();

	// Go to the URL
	await page.goto(url);

	let saveCookies = await inquirer.prompt({
		type: 'confirm',
		name: 'continue',
		message: 'Do you want to save the current cookies?'
	}).then(res => res.continue);

	if (saveCookies) {
		const pageCookies = await page.cookies()
		const cookies = JSON.stringify(pageCookies);
		if (!fs.existsSync('./backstop')) {
			fs.mkdirSync('./backstop');
		}

		await fs.writeFileSync(`./backstop/cookies.${url.host}.json`, cookies);

		console.log(chalk.yellow(`🍪 ${pageCookies.length} cookie${pageCookies.length == 1 ? '' : 's'} saved at:`), `./backstop/cookies.${url.host}.json`,);
	}

	browser.close();
};

start();
