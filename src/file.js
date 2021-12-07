const fs = require("fs");

function readFile(filepath) {
    try {
        return fs.readFileSync(filepath, 'utf8');
    }  catch (e) {
        console.log(e);
        throw e
    }
}

function writeFile(filePath, fileName, fileContent) {
    try {
        if (!fs.existsSync(filePath)) {
            console.warn("Output dir doesnt exists. Creating it...");
            fs.mkdirSync(filePath, '0777');
        }
        fs.writeFileSync(filePath + fileName, fileContent);
        return true;

    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    readFile,
    writeFile
}
