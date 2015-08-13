var Order = require('../models/order');
var ObjectId = require('mongoose').Types.ObjectId; 

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
	getOrderByUserID:function(orderInfo ,next){
		Order.find({'userID': orderInfo.userID,status:orderInfo.orderStatus}).select('createTime price yhd_orderID orderID packageList').populate({
			path: 'packageList',
			select: 'title thumbnail'
		}).exec(next);
	},
	getOneByID:function(orderID,next){
		Order.find({'orderID': orderID},function(err,data){
			next(err,data);
		});
	},
	modifyStatus: function(data, next){
		var statusDescObj = {
			'0' : '未付款',
			'1' : '待发货',
			'2' : '已发货',
			'3' : '已完成',
			'-1' : '已取消'
		};
		Order.update({'orderID': data.orderID,'userID':data.userID}, {'status': data.status, 'statusDesc' : statusDescObj[data.status]}, {},function(err){
			next(err);
		});
	}
};