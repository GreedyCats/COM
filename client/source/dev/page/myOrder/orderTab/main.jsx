define([
	'React',
	'jQuery',
	'less!./orderTab'
],function(React, $){
	return React.createClass({
		render: function(){
			return (
				<ul className="orderTab">
					<li>
						<a href="javascript:;" className="tabLink">
							<Svg className='icon' name='order_pay'></Svg>
							<span className="tabName">待付款</span>
						</a>
					</li>&nbsp;
					<li>
						<a href="javascript:;" className="tabLink">
							<Svg className='icon' name='truck2'></Svg>
							<span className="tabName">待发货</span>
						</a>
					</li>&nbsp;
					<li>
						<a href="javascript:;" className="tabLink">
							<Svg className='icon' name='box'></Svg>
							<span className="tabName">待收货</span>
						</a>
					</li>&nbsp;
					<li>
						<a href="javascript:;" className="tabLink">
							<Svg className='icon' name='bowl'></Svg>
							<span className="tabName">已完成</span>
						</a>
					</li>
				</ul>
			);
		}
	});

});