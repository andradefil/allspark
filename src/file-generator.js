const fs = require("fs");

module.exports = (outDir, output) => {
    try {
        if (!fs.existsSync(outDir)) {
            console.warning("Output dir doesnt exists. Creating it...");
            fs.mkdirSync(outDir, '0777');          
        }
        fs.writeFileSync(outDir + "budget.html", output);
        return true;
        
    } catch (e) {
        console.log(e);
        return false;
    }
}