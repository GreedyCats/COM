var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var user = require('./routes/user');
var package = require('./routes/package');
var product = require('./routes/product');
var country = require('./routes/country');
var mongoose = require('mongoose');
var CONFIG = require('./config.json');

//connect to mongoose
mongoose.connect('mongodb://'+CONFIG.MONGO_USER+':'+CONFIG.MONGO_PASSWORD+'@'+CONFIG.MONGO_SERVER+':'+CONFIG.MONGO_PORT+'/'+CONFIG.MONGO_DATABASE);

var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(
    path.join(__dirname, '../client'), 
    {
        maxAge:0,
        setHeaders : function (res, path) {
            res.set("Access-Control-Allow-Origin", "*");
        }
    }
));

app.use('/', routes);
app.use('/user', user);
app.use('/package', package);
app.use('/product', product);
app.use('/country', country);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
