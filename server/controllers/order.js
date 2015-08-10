var Order = require('../models/order');

module.exports = {
	model:Order,
	addOne:function(data,next){
		var orderID = new Date().getTime() + '' + Math.random().toFixed(4) * 10000; 
		data.orderID = orderID;
		
		var newOrder = new Order(data);
		newOrder.save(function(err,data){
			next(err,data);
		});
	},
	getAllByUserID:function(userID ,next){
		Order.find({'userID': userID}).exec(next);
	},
	getOneByID:function(orderID,next){
		Order.find({'orderID': orderID},function(err,data){
			next(err,data);
		});
	},
	updateStatus: function(data, next){
		var statusDescObj = {
			'0' : '未付款',
			'1' : '待发货',
			'2' : '已发货',
			'4' : '已完成',
			'-1' : '已取消'
		};
		Order.update({'orderID': data.orderID}, {'status': data.status, 'statusDesc' : statusDescObj[data.status]}, {},function(err){
			next(err);
		});
	}
};