const HandleBars = require("handlebars");

module.exports = (customerName, budget) => {
    const template = HandleBars.compile(`<html>
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
      customerName: customerName,
      taxAmount: budget.taxAmount,
      amount: budget.amount,
      cost: budget.cost,
    };

    return template(payload);
};