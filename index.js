const fs = require("fs");
const HandleBars = require("handlebars");

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

const config = loadConfig();
const taxes = config.taxes;
const developers = config.developers;
const features = config.features;

// calculations
let cost = 0;
for (let feature of features) {
  for (let developer of developers) {
    cost += feature.time * developer.cost;
  }
}

let taxAmount = 0;
for (let tax of taxes) {
  taxAmount += (cost * tax.percent) / 100;
}

const amount = cost - taxAmount;

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
  taxAmount: taxAmount,
  amount: amount,
  cost: cost,
};

const output = template(payload);

// generate file
console.log("budget created, generating file...");
const stream = fs.createWriteStream("budget.html");
stream.once("open", () => {
  stream.write(output);
  stream.end();
});
