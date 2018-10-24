var express = require('express');
var router = express.Router();

var {Location} = require('../models/location');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', function (req, res) {
    Location.find().then((docs) => {
      if (!docs) {
        return res.status(200).send("No location found");
      }
  
      res.status(200).send(docs);
    });
})

router.post('/', (req, res) => {
    Location.findOne({'name': req.body.name}).then((docs) => {
      if(docs) {
        return res.status(400).send("Location already exist");
      };
  
      var location = new Location({
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      });
    
      location.save().then((doc) => {
        res.send(doc);
      }, (e) => {
        res.status(400).send(e);
      });
    });
})

module.exports = router;
  
