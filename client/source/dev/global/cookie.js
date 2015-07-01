define(function() {
    //TODO  这个cookie方法有缺陷，日后修复完整
    return {
        getCookie: function(c_name) {
            if (document.cookie.length > 0) {　　　　　　　　
                c_start = document.cookie.indexOf(c_name + "=");　　　　　　　　　
                if (c_start != -1) {　　　　　　　　
                    c_start = c_start + c_name.length + 1;　　　　　　　　　
                    c_end = document.cookie.indexOf(";", c_start);　　　　　　　　　　
                    if (c_end == -1) c_end = document.cookie.length　;　　　　　　　　　
                    return unescape(document.cookie.substring(c_start, c_end))　　　　
                }　　　　
            }　　　　
            return ""
        },
        setCookie: function(c_name, value, expiredays) {
            var exdate = new Date();　　　　
            exdate.setDate(exdate.getDate() + expiredays);　　　　
            document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
        }
    }

})
