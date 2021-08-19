const fs = require("fs");

module.exports = (outDir, output) => {
    try {
        try {
            fs.lstatSync(outDir).isDirectory();
        } catch(e) {
            console.warning("Output dir doesnt exists. Creating it...");
            fs.mkdirSync(outDir, '0777');
        } finally {
            fs.writeFileSync(outDir + "budget.html", output);
            return true;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}