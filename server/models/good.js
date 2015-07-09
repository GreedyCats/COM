var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goodSchema = new Schema({
	title: String,
	weight: String,
	country: {
		type: Schema.Types.ObjectId,
		ref: 'Country'
	}
});

var goodModel = mongoose.model('Good', goodSchema);

module.exports = goodModel;