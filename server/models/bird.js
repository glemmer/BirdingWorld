var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bird = mongoose.model('Bird', {
    name : {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
});

module.exports = {Bird}