define(['jQuery','storage'], function($) {
    var regx = /#gc_/;
    var regxGo = /go/;
    var regxShow = /show/;
    var regxBack = /back/;
    $('body').on('click', 'a', function() {
        var href = $(this).attr('href');
        if (regx.test(href)) {
            //协议名
            var func = href.match(/#gc_(.{1,})/)[1];
            try {
                var params = {};
                // if (href.indexOf('?') > -1) {
                //     params = href.substring(href.indexOf('?')+1,href.length);
                // };
                // params = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
                if (regxGo.test(func)) {
                    var des = href.match(/go_(.{1,})/)[1];
                    webkit.messageHandlers['jump'].postMessage({
                        page:des,
                        params:params
                    });
                }else if (regxShow.test(func)) {
                    var des = href.match(/show_(.{1,})/)[1];
                    webkit.messageHandlers['show'].postMessage({
                        page:des,
                        params:params
                    });
                }else if (regxBack.test(func)) {
                    webkit.messageHandlers['back'].postMessage({});
                };
            } catch (err) {
                if (regxGo.test(func)) {
                    var des = href.match(/go_(.{1,})/)[1];
                    window.location.href = des;
                }else if (regxShow.test(func)) {
                    var des = href.match(/show_(.{1,})/)[1];
                }else if (regxBack.test(func)) {
                    //这个goBack逻辑绝对是你们接手以来最坑的部分，如果想彻底解决这个问题，请将后端的url和前端的url一起做一次规则整理，可以参考github的url规则
                    setTimeout(function(){
                        window.history.go(-3);
                    },0)
                };
            }
        };
    });

    var bridge =  {
        checkLogin:function(next){
            next(false);
        },
        getUrlParameter:function(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        },
        dataFromNative:function(){
            var data = {};
            try {
                webkit.messageHandlers['getData'].postMessage({});
            } catch (err) {
                
            }
            return data;
        },
        storage:$.localStorage
    }

    window.Bridge = bridge;
})
