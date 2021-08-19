const fs = require("fs");
const HandleBars = require("handlebars");
const TYPE = "project";

function loadConfig() {
  return {
    customerName: "My Awesome Customer",
    projectName: "My Awesome Project",
    features: [
      {
        name: "Crud Barbers",
        time: 1,
      },
      {
        name: "Reports of seling by week",
        time: 1,
      },
      {
        name: "Eletronic signed login",
        time: 3,
      },
    ],
    taxes: [
      {
        percent: 20,
      },
    ],
    developers: [
      {
        cost: 100,
      },
    ],
  };
}

function loadBudget(config) {
	return require(`./src/${TYPE}`)(config);
}

const config = loadConfig();
const budget = loadBudget(config);

// template engine
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
  cost: budget.cost,
};

const output = template(payload);

// generate file
console.log("budget created, generating file...");
const stream = fs.createWriteStream("budget.html");
stream.once("open", () => {
  stream.write(output);
  stream.end();
});
