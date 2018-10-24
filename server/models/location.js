var mongoose = require('mongoose');
var decimal128 = mongoose.SchemaTypes.Decimal128;
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    latitude : {
        type: decimal128,
        required: false,
        minlength: 1
    },
    longitude : {
        type: decimal128,
        required: false,
        minlength: 1
    }  
});

LocationSchema.methods.findLocation = function(name) {
    Location.findOne({"name":name}).then((location) => {
        if (!location) {
            return undefined;
        }

        console.log(`Location -> ${JSON.stringify(location)}`);
        return location;
    })
};

var Location = mongoose.model('Location', LocationSchema);

module.exports = {Location};
