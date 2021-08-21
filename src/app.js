const templateGenerator = require('./template-generator');
const { writeFile } = require('./file');

function verbose(message = "") {
    if (process.env.VERBOSE) {
        console.log(message);
    }
}

function loadConfig() {
    try {
        return require(args.configPath);
    } catch (err) {
        console.error("Couldn't load the config file")
        console.log(err);
        process.exit(-1);
    }
}

function loadBudget(config) {
    try {
        return require(`./src/${args.type}`)(config);
    } catch (err) {
        console.error("Couldn't calc the budget. Make sure the config file matchs the specified calc type")
        console.log(err);
        process.exit(-1);
    }
}

function run(args) {
    verbose("Loading config file...");
    const config = loadConfig();
    verbose("Performing budget calc...");
    const budget = loadBudget(config);
    verbose("Generating template and writing payload...");
    const output = templateGenerator({
        customerName: config.customerName,
        taxAmount: budget.taxAmount,
        amount: budget.amount,
        cost: budget.cost,
    });
    verbose("Budget created, generating file...");
    const success = writeFile(args.outputDir, "budget.html", output);

    if (success) {
        console.info("Done!");
        process.exit(0);
    }

    console.error("Erro!");
    process.exit(-1);

}

module.exports = {
    run
}