var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
    ut: {
        type: String,
        default: ""
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    createAt: {
    	type: Date, 
    	expires: 30
    }
});

var sessionModel = mongoose.model('Session', SessionSchema);

module.exports = sessionModel;
