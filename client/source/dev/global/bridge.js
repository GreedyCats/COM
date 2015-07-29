define(['jQuery'], function($) {
    var regx = /#gc_/;
    $('body').on('click', 'a', function() {
        if (regx.test($(this).attr('href'))) {
            //协议名
            var func = $(this).attr('href').match(/#gc_(\w{1,})/)[1];
            try {
                webkit.messageHandlers[func].postMessage("showMenu");
            } catch (err) {
                console.log(func)
            }

        };
    });

    var bridge =  {
        checkLogin:function(next){
            next(false);
        }
    }

    window.Bridge = bridge;
})
