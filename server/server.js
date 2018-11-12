var express = require('express');
var bodyParser = require('body-parser');
var birdRouter = require('./routers/BirdRouter.js');
var locationRouter = require('./routers/LocationRouter.js');
var userRouter = require('./routers/UserRouter.js');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');


var app = express();

app.use(bodyParser.json());

//Route for birds
app.use('/birds',birdRouter);

//Route for locations
app.use('/locations',locationRouter);

app.use('/users',userRouter);

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
