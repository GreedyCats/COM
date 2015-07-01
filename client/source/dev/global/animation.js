define(function(){
    var exports = {};

    //requestAnimationFrame & cancelAnimationFream.
    var nextFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) { return setTimeout(callback, 1); };
    })();

    var cancelFrame = (function () {
        return window.cancelAnimationFrame ||
            window.cancelRequestAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout;
    })();

    var PI = Math.PI;

    //todo : 多个动画同时进行 可能会有问题.
    var timer = null;

    // sin 动画.
    // start : 要改变的初始值
    // end : 要改变的最后值
    // time : 改变的时间间隔
    // callback : 改变过程中的回调函数
    // finish : 完成后的时间函数.
    exports.sin = function(start,end,time,callback,finish){
        var _start = new Date().getTime();
        var _end = _start + time, _mid  = start;

        if(timer){
            cancelFrame(timer);
            timer = null;
        }

        function step() {
            var _now = new Date().getTime();
            if(_now > _end){
                _mid = end;
            }
            else{
                _mid = Math.sin((_now-_start)/(time) * PI / 2) * (end - start) + start;
            }
            callback && callback.apply(null,[_mid]);
            if (_now > _end ){
                cancelFrame(timer);
                timer = null;
                finish && finish.apply(null);
            }else{
                timer = nextFrame(step);
            }
        }
        step();
        timer = nextFrame(step);

        return {
            stop : function(preventDefault){
                if(timer){
                    cancelFrame(timer);
                    timer = null;
                    !preventDefault && finish(_mid);
                }
            },
            status : function(){
                return timer ? "running" : "done";
            },
            now : function(){
                return _mid;
            },
            end : function (){
                return end;
            },
            start : function (){
                return start;
            }
        }
    };

    // sin 动画.
    // start : 要改变的初始值
    // end : 要改变的最后值
    // time : 改变的时间间隔
    // callback : 改变过程中的回调函数
    // finish : 完成后的时间函数.
    exports.cos = function(start,end,time,callback,finish){
        var _start = new Date().getTime();
        var _end = _start + time, _mid  = start;

        if(timer){
            cancelFrame(timer);
            timer = null;
        }

        function step() {
            var _now = new Date().getTime();
            if(_now > _end){
                _mid = end;
            }
            else{
                _mid = Math.cos((_now-_start)/(time) * PI / 2) * (end - start) + start;
            }
            callback && callback.apply(null,[_mid]);
            if (_now > _end ){
                cancelFrame(timer);
                timer = null;
                finish && finish.apply(null);
            }else{
                timer = nextFrame(step);
            }
        }
        step();
        timer = nextFrame(step);

        return {
            stop : function(preventDefault){
                if(timer){
                    cancelFrame(timer);
                    timer = null;
                    !preventDefault && finish(_mid);
                }
            },
            status : function(){
                return timer ? "running" : "done";
            },
            now : function(){
                return _mid;
            },
            end : function (){
                return end;
            },
            start : function (){
                return start;
            }
        }
    };


    return exports;



});
