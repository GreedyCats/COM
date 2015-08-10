var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {type: String, default: ""},
	phone: {type: String, default: ""},
	password: {type: String, default: ""},
	experience:{type:Number,default: 0},
	gender:{type:Number,default:0},
	avatarUrl:{type:String,default:"/uploads/avatar.jpg"},
	addressList:[{
		type:Schema.Types.ObjectId,
		ref:'Address'
	}],
	createTime: {type: Date, default: Date.now}
});

var userModel = mongoose.model('User', UserSchema);

module.exports = userModel;