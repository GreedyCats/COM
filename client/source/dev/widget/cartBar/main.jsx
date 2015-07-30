define(['React','less!./cartBar'], function(React){

 return React.createClass({
    getInitialState: function() {
        this.isLogin = false;
        return {
            cartList : [],
            totalPrice: 0
        };
    },
    addPackage:function(package){
        var self = this;
        if (this.isLogin) {

        }else{
            var packageID = package._id;
            var cartList = this.state.cartList;
            var exists = false;
            cartList.forEach(function(item){
                if (item.packageID == packageID){
                    item.count ++ ;
                    exists = true;
                    return;
                }
            });
            if (!exists){
                cartList.push({
                    packageID : packageID,
                    count: 1
                });
            }
            this.setState({cartList: cartList},function(){
                self.getTotalPrice();
                Bridge.storage.set('cartList', self.state.cartList);
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
                cartList:this.state.cartList
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
                var cartList = Bridge.storage.get('cartList') || [];
                self.setState({cartList: cartList},function(){
                    self.getTotalPrice();
                });
            }
        });
    },
    render: function () {
        var cartList = this.state.cartList;
        var totalCount = 0;
        cartList.forEach(function(item){
            totalCount += item.count;
        });
        var price = String(this.state.totalPrice).split('.');
        return (
            <div className="cartBar">
                <div className='content'>
                    <div className='left'>
                        <span className='total'>合计：</span>
                        <div className='price'>
                            <span className='rmb'>¥</span>
                            <span className='integer'>{price && price[0] || 0}</span>
                            <span className='decimal'>.{price && price[1] || 0}</span>
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
