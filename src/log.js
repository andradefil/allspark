function verbose(message = "") {
    if (process.env.VERBOSE) {
        console.log(message);
    }
}

function error(message) {
    console.error(message);
}

function info(message) {
    console.info(message);
}

module.exports = {
    verbose,
    info,
    error
}