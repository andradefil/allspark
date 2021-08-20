const argparser = require('./src/argument-parser');
const templateGenerator = require('./src/template-generator');
const fileGenerator = require('./src/file-generator');

console.timeLog();
console.info("Parsing arguments");
const args = argparser();

function verbose(message = "") {
	if(args.verbose) {
		console.log(message);
	}
}

function loadConfig() {
	try {
		return require(args.configPath);
	} catch(err) {
		console.error("Couldn't load the config file")
		console.log(err);
		process.exit(-1);
	}
}

function loadBudget(config) {
	try {
		return require(`./src/${args.type}`)(config);
	} catch(err) {
		console.error("Couldn't calc the budget. Make sure the config file matchs the specified calc type")
		console.log(err);
		process.exit(-1);
	}
}

verbose("Loading config file...");
const config = loadConfig();
verbose("Performing budget calc...");
const budget = loadBudget(config);
verbose("Generating template and writing payload...");
const output = templateGenerator({ config, budget });
verbose("Budget created, generating file...");
const success = fileGenerator(args.outputDir, output);

if(success) {
	console.info("Done!");
	process.exit(0);
}

console.error("Erro!");
process.exit(-1);
