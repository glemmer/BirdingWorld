const _ = require('lodash');

var express = require('express');
var router = express.Router();

var {User} = require('../models/user');
var {authenticate} = require('../middleware/authenticate');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});
// POST /users
router.post('/', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
  
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
  });
  
  router.get('/me', authenticate, (req, res) => {
    res.send(req.user);
  });
  
  // POST /users/login {email, password}
  router.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
  
    User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    }).catch((e) => {
      res.status(400).send();
    });
  });

  module.exports = router;