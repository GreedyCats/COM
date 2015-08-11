var Package = require('../models/package');
var Cart = require('../models/cart');

module.exports = {
    getTotalPrice: function(cartList, next) {
        var packageIDs = [];
        var countObj = {};
        cartList = cartList || [];
        cartList.forEach(function(item) {
            packageIDs.push(item.packageID);
            countObj[item.packageID] = item.count;
        });
        Package.find().where('_id').in(packageIDs).select('price').exec(function(err, data) {
            var totalPrice = 0;
            var resData = {};
            data.forEach(function(p) {
                totalPrice += p.price * countObj[p._id];
            });
            resData.totalPrice = totalPrice.toFixed(1);
            next(err, resData);
        });
    },
    getCartListInfo: function(cartList, next) {
        var packageIDs = [],
            countObj = {};
        cartList = cartList || [];

        cartList.forEach(function(item) {
            packageIDs.push(item.packageID);
            countObj[item.packageID] = item.count;
        });

        Package.find().where('_id').in(packageIDs).select('title thumbnail price').lean().exec(function(err, data) {
            var totalPrice = 0;
            var resData = {};
            data.forEach(function(p) {
                p.count = Number(countObj[p._id]);
                totalPrice += p.price * countObj[p._id];
            });
            resData.cartListInfo = data || [];
            resData.totalPrice = totalPrice.toFixed(1);
            next(err, resData);
        });
    },
    mergeFromLocal: function(userID,localPackageList,next) {
        //此接口用于用户登录之后merge本地的购物车和线上的购物车
        Cart.findOne({
            userID: userID
        }, function(err, doc) {
            if (doc) {
                doc.packageList = mergeCart(localPackageList,doc.packageList);
                doc.save(function(err, data, count) {
                	next(err,data.packageList)
                });
            }else{
                self.newCart(userID, localPackageList, function(err, data) {
                    next(err, data.packageList);
                })
            }
        });
    },
    newCart: function(userID, data, next) {
        //创建属于用户的购物车，并且将数据录入
        var cartData = {
            userID: userID,
            packageList: data
        }
        var newCart = new Cart(cartData)
        newCart.save(function(err, data) {
            var cartData = null;
            if (data) {
                cartData = data.packageList;
            };
            next(err, cartData)
        })
    },
    modifyCart: function(userID, modifyData, next) {
        var self = this;
        //这里先检测是否存在userID的cart
        //如果有的话，直接操作，如果没有，那么创建一个

        //data = { type : 操作类型[remove,modify,create] , packageID: packageID ,count:Int}
        Cart.findOne({
            userID: userID
        }, function(err, doc) {
            if (doc) {
                //创建了的话 modify数据
                switch (modifyData.type) {
                    case 'remove':
                        doc.packageList = removePackageByID(modifyData.packageID, doc.packageList);
                        break;
                    case 'modify':
                        doc.packageList = modifyPackageByID(modifyData.packageID, modifyData.count, doc.packageList);
                        break;
                    case 'add':
                        doc.packageList = addPackageByID(modifyData.packageID, doc.packageList);
                        break;
                    default:
                        break;
                }
                doc.save(function(err, data, count) {
                	next(err,data.packageList)
                });
            } else {
                //没有的话创建一个
                if (modifyData.type !== 'remove') {
                    var newData = [{
                        packageID: modifyData.packageID,
                        count: modifyData.count || 1
                    }]
                } else {
                    newData = [];
                }
                self.newCart(userID, newData, function(err, data) {
                    next(err, data.packageList);
                })
            }
        })
    },
    getCartByUserID: function(userID, next) {
        Cart.findOne({
            userID: userID
        }, function(err, data) {
            next(err, data);
        })
    }
}

function mergeCart(localPackageList,packageList){
	var newList = localPackageList;
	packageList.forEach(function(package,index){
		var hasThisPackage = false;
		if (!localPackageList.some(function(thisPackage,index){
			return thisPackage.packageID == package.packageID;
		})) {
			newList.push(package)
		};
	})
	return newList;
}

function removePackageByID(packageID, packageList) {
    var newList = [];
    packageList.forEach(function(package, index) {
        if (package.packageID != packageID) {
        	console.log(packageID,package.packageID)
            newList.push(package);
        };
    })
    return newList;
}

function modifyPackageByID(packageID, count, packageList) {
    packageList.forEach(function(package, index) {
        if (package.packageID == packageID) {
            package.count = count || 1;
        }
    })
    return packageList;
}

function addPackageByID(packageID, packageList) {
    var hasPackage = false;
    packageList.forEach(function(package, index) {
        if (package.packageID == packageID) {
            hasPackage = true;
            package.count += 1;
        }
    })
    if (!hasPackage) {
        packageList.push({
            packageID: packageID,
            count: 1
        })
    };
    return packageList;
}

function createObject(obj) {
    var newObj = {};
    for (key in obj) {
        newObj[key] = obj[key];
    }
    return newObj;
}

function createArray(array) {
    var newArray = [];
    var newObj = {};
    for (var i = 0; i < array.length; i++) {
        newObj = createObject(array[i]);
        newArray.push(newObj);
    };
    return newArray;
}
