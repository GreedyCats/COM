define(['React','less!./cartBar'], function(React){

 return React.createClass({
    getInitialState: function() {
            console.log(111);

        this.isLogin = false;
        this.list = [];
        return {
            list : []
        };
    },
    addPackage:function(package){
        if (this.isLogin) {

        }else{
            this.list.push(package);
            this.forceUpdate();
        }
    },
    componentDidMount:function(){
        //判断是否是登录状态
        //如果不是 那么使用localStorage作为本地存储
        //如果已登录 那么使用线上购物车作为真实购物车
        var self = this;
        Bridge.checkLogin(function(isLogin){
            self.isLogin = isLogin; 
            if (isLogin) {
                //ajax
            }else{
                //localStorage
                
            }
        })
    },
    render: function () {
        return (
            <div className="cartBar">
                
            </div>
        );
    }
  });
});
