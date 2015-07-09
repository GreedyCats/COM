var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = Schema({
	name: String,
	flagUrl: String
});

var countryModel = mongoose.Model('Country', countrySchema);

module.exports = countryModel;