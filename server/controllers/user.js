var User = require('../models/user');
var session = require('./session');

//过期时间
var EXPIRES = 3600;

//生产用户ut的token规则
function makeToken() {
    return Math.random().toString(36).substr(2).toUpperCase();
}

module.exports = {
    model: User,
    addOne: function(data, next) {
        var newUser = new User(data)
        newUser.save(function(err, data) {
            next(err, data)
        })
    },
    login: function(data, next) {
        //验证用户名密码，如果成功的话，增加一个ut到session类里
        this.checkLogin(data.ut, function(result) {
            if (result.status) {
                User.findById(result.userID, function(err, data) {
                    next({
                        status: true,
                        ut: result.ut,
                        name: data.name,
                        phone: data.phone,
                        avatarUrl: data.avatarUrl,
                        experience: data.experience,
                        gender: data.gender
                    })
                })
            } else {
                User.findOne({
                    phone: data.phone,
                    password: data.password
                }, function(err, data) {
                    if (err) {
                        next({
                            status: false
                        });
                    } else {
                        if (data) {
                            //登陆成功后 生成ut并且塞入session之中
                            var token = makeToken();
                            session.addOne({
                                ut: token,
                                userID: data._id
                            }, function(err, loginData) {
                                if (err) {
                                    next({
                                        status: false
                                    })
                                } else {
                                    next({
                                        status: true,
                                        ut: token,
                                        name: data.name,
                                        phone: data.phone,
                                        avatarUrl: data.avatarUrl,
                                        experience: data.experience,
                                        gender: data.gender
                                    })
                                }
                            })
                        } else {
                            next({
                                status: false
                            })
                        }
                    }
                })
            }
        })

    },
    checkLogin: function(ut, next) {
        if (ut === undefined) {
            next({
                status: false
            })
            return;
        };
        session.findOne({
            ut: ut
        }, function(err, data) {
            if (err) {
                next({
                    status: false
                });
            } else {
                if (data) {
                    next({
                        status: true,
                        userID: data.userID,
                        ut: data.ut
                    })
                } else {
                    next({
                        status: false
                    })
                }
            }
        })
    }
};
