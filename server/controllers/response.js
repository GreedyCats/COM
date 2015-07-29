module.exports = Res;

function Res(){
	this.status = '';
	this.message = '';
	this.data = {};
}
Res.prototype.toString = function(){ 
	var res = {
		status:this.status,
		message:this.message,
		data:this.data
	}
	return JSON.stringify(res);
}
