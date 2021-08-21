const HandleBars = require("handlebars");
var path = require('path');
var appDir = path.dirname(require.main.filename);
const { readFile } = require('./file');

function template(payload) {
    const file = readFile(appDir + '/src/templates/br.html')
    const template = HandleBars.compile(file);
    return template(payload);
}

module.exports = {
    template
};