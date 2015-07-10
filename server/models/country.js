var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
	name: {type: String, default: ""},
	flagUrl: {type: String, default: ""}
});

var countryModel = mongoose.model('Country', countrySchema);

module.exports = countryModel;