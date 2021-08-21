const app = require('./src/app')
const argParser = require('./src/argument-parser');

console.timeLog();
console.info("Parsing arguments");
const args = argParser();
app.run(args);