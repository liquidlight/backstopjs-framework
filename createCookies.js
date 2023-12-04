// Require packages
const puppeteer = require('puppeteer');
const fs = require('fs');
const chalk = require('chalk');

// Only paramter is the URL where you login
if (process.argv.length !== 3) {
	console.log(chalk.red('Please pass the login URL as the only parameter'))
}

// Set the URL
let url = new URL(process.argv[2]);

// Create a login function
(async () => {
	// Create a new puppeteer browser
	const browser = await puppeteer.launch({
		// Change to `false` if you want to open the window
		headless: false,
	});

	// Create a new browser page
	const page = await browser.newPage();

	// Go to the URL
	await page.goto(url);

	// Wait for a selector to be loaded on the page -
	// this helps make sure the page is fully loaded so you capture all the cookies
	await page.waitForNavigation({ waitUntil: "load" });

	const cookies = JSON.stringify(await page.cookies());
	if (!fs.existsSync('./backstop')) {
		fs.mkdirSync('./backstop');
	}

	await fs.writeFileSync(`./backstop/cookies.${url.host}.json`, cookies);

	// Close the browser once you have finished
	browser.close();
})();
