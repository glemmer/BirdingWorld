var express = require('express');
var bodyParser = require('body-parser');
var birdRouter = require('./routers/BirdRouter.js');
var locationRouter = require('./routers/LocationRouter.js');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');


var app = express();

app.use(bodyParser.json());

//Route for birds
app.use('/birds',birdRouter);

//Route for locations
app.use('/locations',locationRouter);

app.listen(3000, () => {
  console.log('Started on port 3000');
});
