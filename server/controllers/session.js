var Session = require('../models/session');

module.exports = {
	model:Session,
	addOne:function(data,next){
		var newSession = new Session(data);
		newSession.save(function(err,data){
			next(err,data);
		});
	},
	findOne:function(data,next){
		Session.findOne(data,function(err,data){
			next(err,data);
		})
	}
};