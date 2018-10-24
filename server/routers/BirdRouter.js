var express = require('express');
var router = express.Router();

var {Bird} = require('../models/bird');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  Bird.find().then((docs) => {
    if (!docs) {
      return res.status(200).send("No birds found");
    }

    res.status(200).send(docs);
  });
})

router.post('/', (req, res) => {
  Bird.findOne({'name':req.body.name}).then((docs) => {
    if(docs) {
      return res.status(400).send("Bird already exist");
    };

    var bird = new Bird({
      name: req.body.name,
    });
    
    bird.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });
})

// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
});

module.exports = router;