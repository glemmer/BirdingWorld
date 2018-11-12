var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/BirdingWorldApp',{useNewUrlParser:true});
mongoose.set('useCreateIndex', true);

module.exports = {mongoose};