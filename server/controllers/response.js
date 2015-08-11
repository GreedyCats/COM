module.exports = Res;

/*
	Code 机制
	-1 	-> 	未登录
	1 	-> 	正常
 */

function Res(){
	this.code = 1;
	this.message = '';
	this.data = {};
}
Res.prototype.toString = function(){ 
	var res = {
		message:this.message,
		data:this.data,
		code:this.code
	}
	return JSON.stringify(res);
}
