# allspark
AllSpark is the source energy for the transformers, and well is the force to generate budget preview for agile software projects

![Image of Yaktocat](https://static.wikia.nocookie.net/transformers/images/9/94/O_AllSpark_Bayverse.jpg/revision/latest?cb=20210111221312&path-prefix=pt)

# Configuration
A project is configured using a simple json like that

- For `project` mode: 
```json
{
  "customerName": "My Awesome Customer",
  "projectName": "My Awesome Project",
  "features": [
    {
      "name": "Crud Barbers",
      "time": 1
    },
    {
      "name": "Reports of seling by week",
      "time": 1
    },
    {
      "name": "Eletronic signed login",
      "time": 3
    }
  ],
  "taxes": [
    {
      "percent": 20
    }
  ],
  "developers": [
    {
      "cost": 100
    }
  ]
}
```

- For `freelancer` mode: 
  * not implemented

- For `team` mode:
  * not implemented

After to configure, the budget is ready to build

# Args

The possible arguments for allspark are: 
  - `-v` or `--verbose`: Tells allspark to enligth you with all the information of whats is being done behind the scenes (verbose). Defaults to `false`.
  - `-c` or `--configPath`: Specifies the config file path. It's required.
  - `-o` or `--outputDir`: Specifies the output directory to write the budget.html file. Defaults to `./`.
  - `-t` or `--type`: Specify wich type of budget you want. The config file should be specified in this mode. Defaults to `project`.
  

# Run
```shell
$ npm install

$ chmod +x .bin/allspark

$ .bin/allspark -v true -c /my/path/to/config.json -o /my/budget/directory/ -t project
```

A html file will be generated on the output dir with the budget calculation
