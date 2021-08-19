const TYPE = "project";

function loadConfig() {
	return {
		"customerName": "My Awesome Customer",
		"projectName": "My Awesome Project",
		"features": [
			{
				"name": "Crud Barbers",
				"time": 1
			},
			{
				"name": "Reports of seling by week",
				"time": 1
			},
			{
				"name": "Eletronic signed login",
				"time": 3
			},
		],
		"taxes": [
			{
				"percent": 20,
			}
		],
		"developers": [
			{
				"cost": 100
			}
		]
	}
}

function loadBudget(config) {
	return require(`./src/${TYPE}`)(config);
}

var config = loadConfig();
const budget = loadBudget(config);

// template engine
var HandleBars = require("handlebars")
var template = HandleBars.compile(`
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
`)

var payload = {
	customerName: config.customerName,
	taxAmount: taxAmount,
	amount: amount,
	cost: cost
}

var output = template(payload);
var fs = require('fs');

// generate file
console.log("budget created, generating file...")
var stream = fs.createWriteStream("budget.html");
stream.once('open', () => {
	stream.write(output);
	stream.end();
})


