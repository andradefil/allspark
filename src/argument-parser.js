module.exports = () => {
    const { description, version } = require('../package.json');

    const HELP = ` 
        ${description}.
        Version: ${version}.

        Usage:
        [-h][--help] : Prints this help message.
        [-v][--verbose] : Verbose mode, will tell allspark to print everything that is going on behind the scenes.
        [-c][--configPath] : Tells allspark where is located the config file. Defaults to "./allspark-config.json".
        [-o][--outputDir] : The directory to write the budget.html file. Defaults to "./".
        [t][--type] : Select wich budget calc you want to perform. Config file must attend the type specification.
            - Possible types: ["project"]
            - Defaults to: "project"

        Example: 
        $ allspark -v true -c /my/path/to/config.json -o /my/budget/directory/ -t project
    `;
    const FLAGS = {
        '-v': 'verbose',
        '--verbose': 'verbose',
        '-c': 'configPath',
        '--configPath': 'configPath',
        '-o': 'outputDir',
        '--outputDir': 'outputDir',
        '-t': 'type',
        '--type': 'type'
    };
    const args = process.argv.slice(2); // [0]node [1]index.js [...]args.

    if(args.includes("-h") || args.includes("--help")) {
        console.log(HELP);
        process.exit(0);
    }

    const parsedArgs = {
        verbose: false,
        configPath: './allspark-config.json',
        outputDir: './',
        type: 'project',
    }

    args.forEach((arg) => {
        Object.keys(FLAGS).forEach(flag => {
            if (arg === flag)
                parsedArgs[FLAGS[flag]] = args[args.indexOf(flag) + 1];
        });
    });

    return parsedArgs;
}