define(['jQuery'], function($) {
    var regx = /#gc_/;
    var regxGo = /go/;
    var regxShow = /show/;
    var regxBack = /back/;
    $('body').on('click', 'a', function() {
        var href = $(this).attr('href');
        if (regx.test(href)) {
            //协议名
            var func = href.match(/#gc_(\w{1,})/)[1];
            var params = href.substring(href.indexOf('?')+1,href.length);
            try {
                webkit.messageHandlers[func].postMessage(params);
            } catch (err) {
                
                if (regxGo.test(func)) {
                    var des = href.match(/go(\w{1,})/)[1];
                    des = des.toLowerCase();
                    window.location.href = des+'.html?'+params;
                }else if (regxShow.test(func)) {
                    var des = href.match(/show(\w{1,})/)[1];
                    des = des.toLowerCase();
                    console.log('show:'+des);
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
        }
    }

    window.Bridge = bridge;
})
