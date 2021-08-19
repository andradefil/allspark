const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = (project) => {
    function getProjectName (project) {
        return new Promise((resolve) => {
            rl.question("The name of your Project: ", (answer) => {
                project.name = answer;
                resolve(project);
            });
        });
    };
    function getCustomerName (project) {
        return new Promise((resolve) => {
            rl.question("The name of your Customer: ", (answer) => {
                project.customer = answer;
                resolve(project);
            });
        });
    };
    function getFeaturesCount (project) {
        return new Promise((resolve) => {
            rl.question("How many features are needed in your project: ", (featureCount) => {
                project.featureCount = featureCount;
                resolve(project);
            });
        });
    };
    function getFeatures (project) {
        const promisePool = [];
        for (let i = 0; i < project.featureCount; i++) {
            promisePool.push(
                new Promise((resolve) => rl.question("The name of your feature #" + (i + 1) + ": ", (featureName) => {
                    project.features.push({
                        name: featureName,
                        developerCount: 0,
                        developers: []
                    });
                    resolve(project);
                }))
            );
        }
        return Promise.all(promisePool).then();
    };
    function getFeaturesDevelopersCount (project) {
        const promisePool = [];
        for (let i = 0; i < project.featureCount; i++) {
            promisePool.push(
                new Promise((resolve) => rl.question("How many developers are needed for feature #" + (i + 1) + ": ", (developerCount) => {
                    project.features[i].developerCount = developerCount;
                    resolve(project);
                }))
            );
        }
        return Promise.all(promisePool).then();
    };
    function getFeaturesDevelopers (project) {
        const promisePool = [];
        for (let i = 0; i < project.featureCount; i++) {
            for (let j = 0; j < project.features[i].developerCount; j++) {
                promisePool.push(
                    new Promise((resolve) => rl.question("The name of developer #" + (j + 1) + " for feature #" + (i + 1) + ": ", (developerName) => {
                        project.features[i].developers.push({
                            name: developerName,
                            taxes: [],
                            cost: 0
                        });
                        resolve(project);
                    }))
                );
            }
        }
        return Promise.all(promisePool).then();
    };
    function getFeaturesDevelopersTaxesCount (project) {
        const promisePool = [];
        for (let i = 0; i < project.featureCount; i++) {
            for (let j = 0; j < project.features[i].developerCount; j++) {
                promisePool.push(
                    new Promise((resolve) => rl.question("How many taxes are needed for developer #" + (j + 1) + " for feature #" + (i + 1) + ": ", (taxCount) => {
                        project.features[i].developers[j].taxCount = taxCount;
                        resolve(project);
                    }))
                );
            }
        }
        return Promise.all(promisePool).then();
    };
    function getFeaturesDevelopersTaxes(project) {
        const promisePool = [];
        for (let i = 0; i < project.featureCount; i++) {
            for (let j = 0; j < project.features[i].developerCount; j++) {
                for (let k = 0; k < project.features[i].developers[j].taxCount; k++) {
                    promisePool.push(
                        new Promise((resolve) => rl.question("The name of tax #" + (k + 1) + " for developer #" + (j + 1) + " for feature #" + (i + 1) + ": ", (taxName) => {
                            project.features[i].developers[j].taxes.push({
                                name: taxName,
                                percent: 0
                            });
                            resolve(project);
                        }))
                    );
                }
            }
        }
        return Promise.all(promisePool).then();
    };
    function getFeatureTime (project) {
        const promisePool = [];
        for (let i = 0; i < project.featureCount; i++) {
            promisePool.push(
                new Promise((resolve) => rl.question("How long is the feature #" + (i + 1) + ": ", (featureTime) => {
                    project.features[i].time = featureTime;
                    resolve(project);
                }))
            );
        }
        return Promise.all(promisePool).then();
    };
    function getDeveloperCost (project) {
        const promisePool = [];

        for (let i = 0; i < project.featureCount; i++) {
            for (let j = 0; j < project.features[i].developerCount; j++) {
                promisePool.push(
                    new Promise((resolve) => rl.question("How much is the developer #" + (j + 1) + " for feature #" + (i + 1) + ": ", (developerCost) => {
                        project.features[i].developers[j].cost = developerCost;
                        resolve(project);
                    }))
                );
            }
        }
        return Promise.all(promisePool).then();
    };
    function getTaxPercent (project) {
        const promisePool = [];
        for (let i = 0; i < project.featureCount; i++) {
            for (let j = 0; j < project.features[i].developerCount; j++) {
                for (let k = 0; k < project.features[i].developers[j].taxCount; k++) {
                    promisePool.push(
                        new Promise((resolve) => rl.question("What is the percent of tax #" + (k + 1) + " for developer #" + (j + 1) + " for feature #" + (i + 1) + ": ", (taxPercent) => {
                            project.features[i].developers[j].taxes[k].percent = taxPercent;
                            resolve(project);
                        }))
                    );
                }
            }
        }
        return Promise.all(promisePool).then();
    };

    return getProjectName(project)
        .then(getCustomerName)
        .then(getFeaturesCount)
        .then(getFeatures)
        .then(getFeaturesDevelopersCount)
        .then(getFeaturesDevelopers)
        .then(getFeaturesDevelopersTaxesCount)
        .then(getFeaturesDevelopersTaxes)
        .then(getFeatureTime)
        .then(getDeveloperCost)
        .then(getTaxPercent)        
        .catch(err => console.error(err));
    
};