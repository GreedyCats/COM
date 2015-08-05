var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
	provinceID: {type: Number, default: 0},
	cityID: {type: Number, default: 0},
	areaID: {type: Number, default: 0},
	detail: {type: String, default: ''}
});

var addressModel = mongoose.model('Address', addressSchema);

module.exports = addressModel;