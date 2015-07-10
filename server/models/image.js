var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = Schema({
	url: {type: String, default: ""},
	type: {type: Number, default: 0},
	typeName: {type: String, default: ""},
	good: {
		type: Schema.Types.ObjectId,
		ref: 'Good'
	}
});

var imageModel = mongoose.Model('Image', imageSchema);

module.exports = imageModel;