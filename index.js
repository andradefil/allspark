const fs = require('fs');
const { ArgumentParser } = require('argparse');
const HandleBars = require("handlebars");

const { version, description } = require('./package.json');
const modes = require('./modes');

const parser = new ArgumentParser({
	description
});

parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-c', '--config', { help: 'Path to config file', required: true });
parser.add_argument('-o', '--output', { help: 'Path to output directory where to put the budget.html file', default: './' });
parser.add_argument('-m', '--mode' , { help: 'Mode to run in. Allowed modes are ["freelancer", "project", "team"]', default: 'project'});
parser.add_argument('-s', '--shine', { help: 'Tells allspark to shine so you can see everything that is going on behind the scenes', default: false });

const options = parser.parse_args();

function shine(message) {
	if (options.shine) {
		console.log(message);
	}
}

function loadConfig() {
	try {
		shine('Loading config file...');
		return require(options.config);
	} catch (e) {
		throw new Error('Config file not found at ' + options.config);
	}
}

function loadMode() {
	try {
		shine('Loading mode...');
		return modes[options.mode];
	} catch (e) {
		throw new Error('Invalid mode specified!');
	}
}

function loadBudget(config, mode) {
	try {
		shine('Calculating the budget...');
		return mode(config);
	} catch (e) {
		throw new Error('Config file doesnt match specified mode!');
	}
}

const config = loadConfig();
const mode = loadMode();
const budget = loadBudget(config, mode);

// template engine
shine('Loading template engine...');
const template = HandleBars.compile(`
<html>
	<head>
		<title>Budget</title>
	</head>
	<body>
		<div>
			<h1>{{customerName}}</h1>
		</div>
		<div>
			<h2>Total Amount {{cost}}</h2>
			<h3>Total Taxes {{taxAmount}}</h3>
		</div>
	</body>
</html>
`);

const payload = {
	customerName: config.customerName,
	taxAmount: budget.taxAmount,
	amount: budget.amount,
	cost: budget.cost
}
shine('Rendering template...');
const output = template(payload);

// generate file
console.log("budget created, generating file...")
try {
	fs.writeFileSync(options.output + "/budget.html", output);
} catch(e) {
	fs.mkdirSync(options.output, '0777', (err) => {
		console.error(err);
		throw new Error('Could not create output directory : ' )
		
	});

	fs.writeFileSync(options.output + "/budget.html", output);
} finally {
	process.exit(0);
}



