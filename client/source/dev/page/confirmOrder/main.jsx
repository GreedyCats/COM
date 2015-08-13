define([
    'when',
    'React',
    'jsx!widget/header/main',
    'package/fastclick/fastclick',
    'less!./confirmOrder'
], function (when, React, Header, FC) {

    FC.attach(document.body);

    return React.createClass({
        getInitialState: function () {
            return {
                cartListInfo: [],
                receivingAddress: '收货地址',
                totalPrice: 0
            };
        },
        componentWillMount: function () {
            var self = this;
            //这里暂时只处理未登录的情况
            Bridge.checkLogin(function (isLogin) {
                if (isLogin) {
                    //登录后的逻辑
                } else {
                    //获取数据接口
                    $.ajax({
                        method: 'POST',
                        type: 'JSON',
                        url: '/cart/getCartListInfo',
                        data: {
                            cartList: Bridge.storage.get('cartList') || []
                        },
                        success: function (data) {
                            switch (data.status) {
                                case 'success':
                                    self.setState({
                                        cartListInfo: data.data.cartListInfo,
                                        totalPrice: data.data.totalPrice
                                    });
                                    break;
                                case 'error':
                                    alert(data.message);
                                    break;
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                }
            })
        },
        selectAddress: function () {
            alert('选择地址');
            console.log(1111, arguments);
        },
        addAddress: function () {
            alert('新建地址');
            console.log(1111, arguments);
        },
        render: function () {
            var self = this;
            var totalCount = 0;
            this.state.cartListInfo.forEach(function (item) {
                totalCount += item.count;
            });
            var receivingAddressTpl = (
                <div className="noReceivingAddress" onClick={this.addAddress&&this.addAddress.bind(null, 'test')}>
                                            <span className="noReceivingAddressIcon">
                                                <Svg className="icon" name='add'></Svg>
                                            </span>
                    <label className="addressLabel">收货地址</label>
                </div>);
            if (self.state.receivingAddress) {
                receivingAddressTpl = (<div className="receivingAddress"
                                            onClick={this.selectAddress&&this.selectAddress.bind(null, 'test')}>
                    <label className="addressLabel">收货地址</label>
                    <div className="curAddress">Home</div>
                        <span className="selectAddress">
                            <Svg className="icon" name='arrow_right'></Svg>
                        </span>
                </div>);
            }


            var headerData = {
                btn1: {
                    href: '#gc_back',
                    icon: 'back'
                },
                title: (<div className='title'>
                    <span className="bigTitle">确认订单</span>
                </div>)
            };
            var price = String(this.state.totalPrice).split('.');
            return (
                <div className='pageConfirmOrder'>
                    <Header headerData={headerData}></Header>
                    {receivingAddressTpl}
                    <ul className="cartList">
                        {
                            this.state.cartListInfo.map(function (package, index) {
                                var clz = package.readyDelete ? 'removeByTransform' : undefined;
                                return (<li ref={package._id} className={clz}>
                                    <div className="packageWrapper">
                                        <img src={package.thumbnail} alt={package.title} className="packageThumb"/>
                                        <div className="infoBox">
                                            <span className="title">{package.title}</span>
                                            <span className="price">¥{package.price}</span>
                                        </div>
                                        <div className="count">
                                            <span className="multiSign">X</span>
                                            <span>{package.count}</span>
                                        </div>
                                    </div>
                                </li>)
                            })
                        }
                    </ul>

                    <div className="coupon">
						<span className="couponIcon">
								<Svg className="icon" name='label_coupon'></Svg>
						</span>
                        <div className="couponRight">
                            <label className="couponLabel">优惠券</label>
                            <div className="curCoupon"><span className="symbol">-</span><span className="cny">￥</span>10
                            </div>
                        </div>
                    </div>

                    <div className="transport">
						<span className="transportIcon">
								<Svg className="icon" name='label_truck'></Svg>
						</span>
                        <label className="transportLabel">运费</label>

                        <div className="curTransport">免费</div>
                    </div>

                    <div className="paymentType">
						<span className="paymentIcon">
								<Svg className="icon" name='label_pay'></Svg>
						</span>
                        <label className="paymentLabel">支付方式</label>
                        <div className="curPaymentIcon" style={{backgroundImage:'url(/uploads/alipay.png)'}}></div>
                        <div className="curPayment">支付宝</div>
                    </div>
                    <div className='goPayBox' ref='goPayBox'>
                        <div className='content'>
                            <div className='left'>
                                <span className='total'>合计：</span>
                                <div className='price'>
                                    <span className='rmb'>¥</span>
                                    <span className='integer'>{price && price[0] || 0}</span>
                                    <span className='decimal'>.{price && price[1] || 0}</span>
                                </div>
                            </div>
                            <div className='btnGoPay'>
                                立即支付
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
});
