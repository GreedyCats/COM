var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var evaluationSchema = Schema({
	score: {type: Number, default: 0},
	good: {
		type: Schema.Types.ObjectId,
		ref: 'Good'
	}
});

var evaluationModel = mongoose.Model('Evaluation', evaluationSchema);

module.exports = evaluationModel;