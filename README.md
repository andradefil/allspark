# allspark
AllSpark is the source energy for the transformers, and well is the force to generate budget preview for agile software projects

![Image of Yaktocat](https://static.wikia.nocookie.net/transformers/images/9/94/O_AllSpark_Bayverse.jpg/revision/latest?cb=20210111221312&path-prefix=pt)

# Configuration
A project is configured using a simple json like that
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

After to configure, the budget is ready to build

# Run
```shell
$ npm install
$ node index.js
```

A html file will be generated on the project tree with the budget calculation
