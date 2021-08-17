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

var config = loadConfig();
var taxes = config.taxes;
var developers = config.developers;
var features = config.features;

// calculations
var cost = 0;
for (let feature of features) {
	for (let developer of developers) {
		cost += feature.time * developer.cost;
	}
}

var taxAmount = 0;
for (let tax of taxes) {
	taxAmount += ((cost * tax.percent) / 100);
}

var amount = cost - taxAmount;


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


