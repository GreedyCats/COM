define(['React','less!./cartBar'], function(React){

 return React.createClass({
    getInitialState: function() {
        this.isLogin = false;
        return {
            list : [],
            totalPrice: 0
        };
    },
    addPackage:function(package){
        var self = this;
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
            this.setState({list: list},function(){
                self.getTotalPrice();
                Bridge.storage.set('cartList', self.state.list);
            });
        }
    },
    getTotalPrice: function(){
        var self = this;
        $.ajax({
            method:'POST',
            type:'JSON',
            url:'/cart/getTotalPrice',
            data:{
                list:this.state.list
            },
            success:function(data){
                switch(data.status){
                    case 'success':
                        self.setState({totalPrice:data.data.totalPrice});
                        break;
                    case 'error':
                        alert(data.message);
                        break;
                }
            },
            error:function(err){
                alert(err);
            }
        });
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
                var list = Bridge.storage.get('cartList') || [];
                self.setState({list: list},function(){
                    self.getTotalPrice();
                });
            }
        });
    },
    render: function () {
        var list = this.state.list;
        var totalCount = 0;
        var totalPrice = 0;
        list.forEach(function(item){
            totalCount += item.count;
        });
        return (
            <div className="cartBar">
                <div className='content'>
                    <div className='left'>
                        <span className='total'>合计：</span>
                        <div className='price'>
                            <span className='rmb'>¥</span>
                            <span className='integer'>{this.state.totalPrice}</span>
                            <span className='decimal'>.0</span>
                        </div>
                    </div>
                    <div className='cartBox'>
                        <Svg className='cart' name='cart'></Svg>
                        <span className='number'>{totalCount}</span>
                    </div>
                </div>
            </div>
        );
    }
  });
});
