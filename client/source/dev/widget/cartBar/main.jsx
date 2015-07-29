define(['React','less!./cartBar'], function(React){

 return React.createClass({
    getInitialState: function() {
        this.isLogin = false;
        return {
            list : []
        };
    },
    addPackage:function(package){
        if (this.isLogin) {

        }else{
            var packageID = package._id;
            var list = this.state.list;
            var exists = false;
            list.forEach(function(item){
                if (item.packageID == packageID){
                    item.count ++ ;
                    exists = true;
                    return;
                }
            });
            if (!exists){
                list.push({
                    packageID : packageID,
                    count: 1
                });
            }
            this.setState({list: list});
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
                <div className='content'>
                    <div className='left'>
                        <span className='total'>合计：</span>
                        <div className='price'>
                            <span className='rmb'>¥</span>
                            <span className='integer'>86.</span>
                            <span className='decimal'>9</span>
                        </div>
                    </div>
                    <div className='cartBox'>
                        <Svg className='cart' name='cart'></Svg>
                        <span className='number'>2</span>
                    </div>
                </div>
            </div>
        );
    }
  });
});
