var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = Schema({
	url: String,
	type: String,
	good: {
		type: Schema.Types.ObjectId,
		ref: 'Good'
	}
});

var imageModel = mongoose.Model('Image', imageSchema);

module.exports = imageModel;