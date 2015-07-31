var Package = require('../models/package');
module.exports = {
	getTotalPrice:function(cartList,next){
		var packageIDs = [];
		var countObj = {};
		cartList = cartList || [];
		cartList.forEach(function(item){
			packageIDs.push(item.packageID);
			countObj[item.packageID] = item.count;
		});
		Package.find().where('_id').in(packageIDs).select('price').exec(function(err,data){
			var totalPrice = 0;
			var resData = {};
			data.forEach(function(p){
				totalPrice += p.price * countObj[p._id];
			});
			resData.totalPrice = totalPrice.toFixed(1);
			next(err,resData);
		});
	},
	getCartListInfo: function(cartList, next){
		var packageIDs = [],
			countObj = {};
		cartList = cartList || [];

		cartList.forEach(function(item){
			packageIDs.push(item.packageID);
			countObj[item.packageID] = item.count;
		});

		Package.find().where('_id').in(packageIDs).select('title thumbnail price').lean().exec(function(err,data){
			var totalPrice = 0;
			var resData = {};
			data.forEach(function(p){
				p.count = Number(countObj[p._id]);
				totalPrice += p.price * countObj[p._id];
			});
			resData.cartListInfo = data || [];
			resData.totalPrice = totalPrice.toFixed(1);
			next(err,resData);
		});
	}
}

function createObject(obj) {
    var newObj = {};
    for (key in obj) {
        newObj[key] = obj[key];
    }
    return newObj;
}