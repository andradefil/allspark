const app = require('./src/app')
const argParser = require('./src/parser');

console.timeLog();
const args = argParser();
app.run(args);