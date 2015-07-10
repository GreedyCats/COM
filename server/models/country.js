var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = Schema({
	name: {type: String, default: ""},
	flagUrl: {type: String, default: ""}
});

var countryModel = mongoose.Model('Country', countrySchema);

module.exports = countryModel;