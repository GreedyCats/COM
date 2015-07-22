define([
	'React',
	'jQuery',
	'less!./menu'
],function(React, $){

	return React.createClass({
		getInitialState: function() {
            return {
				on : 0
            };
        },
		render: function(){
			return (
				<div className="menuBox">
					<ul className="menu">
						<li>
							<a href="#" className={'link'+(this.state.on == 0 ? ' on' :'')}>
								<span className="icon">
									<Svg name='bag'></Svg>
								</span>
								<span className="text">今日组合<span className="en">Today eat</span></span>
							</a>
						</li>
						<li>
							<a href="#" className={'link'+(this.state.on == 1 ? ' on' :'')}>
								<span className="icon">
									<Svg name='wallet'></Svg>
								</span>
								<span className="text">我的订单<span className="en">My order</span></span>
							</a>
						</li>
						<li>
							<a href="#" className={'link'+(this.state.on == 2 ? ' on' :'')}>
								<span className="icon">
									<Svg name='coupon'></Svg>
								</span>
								<span className="text">优惠券<span className="en">Coupon</span></span>
							</a>
						</li>
						<li>
							<a href="#" className={'link'+(this.state.on == 3 ? ' on' :'')}>
								<span className="icon">
									<Svg name='truck'></Svg>
								</span>
								<span className="text">收货地址<span className="en">Receiving address</span></span>
							</a>
						</li>
						<li>
							<a href="#" className={'link'+(this.state.on == 4 ? ' on' :'')}>
								<span className="icon">
									<Svg name='setting'></Svg>
								</span>
								<span className="text">设置<span className="en">Setting</span></span>
							</a>
						</li>
						<li>
							<a href="#" className={'link'+(this.state.on == 5 ? ' on' :'')}>
								<span className="icon">
									<Svg name='cat'></Svg>
								</span>
								<span className="text">关于馋猫<span className="en">About</span></span>
							</a>
						</li>
					</ul>
				</div>
			);
		}
	});

});