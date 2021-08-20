module.exports = (payload) => {
    return `<html>
    <head>
        <title>Budget</title>
    </head>
    <body>
        <div>
            <h1>${payload.config.customerName}</h1>
        </div>
        <div>
            <h2>Total Amount ${payload.budget.cost}</h2>
            <h3>Total Taxes ${payload.budget.taxAmount}</h3>
        </div>
    </body>
</html>
    `;
};