module.exports = (config) => {
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
        taxAmount += ((cost * tax.percent) / 100);
    }

    const amount = cost - taxAmount;

    return {
        amount,
        taxAmount,
        cost
    }
}

