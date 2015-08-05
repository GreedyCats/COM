var User = require('../models/user');

module.exports = {
	model:User,
	addOne:function(data,next){
		var newUser = new User(data);
		newUser.save(function(err,data){
			next(err,data);
		});
	}
};