define([
	'React',
	'jQuery',
	'less!./orderTab'
],function(React, $){
	return React.createClass({
		render: function(){
			return (
				<ul className="orderTab">
					<li className={this.props.selected === 0 ? 'on' :undefined}>
						<a href="javascript:;" className="tabLink" onClick={this.props.onTabClick.bind(null,0)}>
							<Svg className='icon' name='order_pay'></Svg>
							<span className="tabName">待付款</span>
						</a>
					</li>&nbsp;
					<li className={this.props.selected === 1 ? 'on' :undefined}>
						<a href="javascript:;" className="tabLink" onClick={this.props.onTabClick.bind(null,1)}>
							<Svg className='icon' name='truck2'></Svg>
							<span className="tabName">待发货</span>
						</a>
					</li>&nbsp;
					<li className={this.props.selected === 2 ? 'on' :undefined}>
						<a href="javascript:;" className="tabLink" onClick={this.props.onTabClick.bind(null,2)}>
							<Svg className='icon' name='box'></Svg>
							<span className="tabName">待收货</span>
						</a>
					</li>&nbsp;
					<li className={this.props.selected === 3 ? 'on' :undefined}>
						<a href="javascript:;" className="tabLink" onClick={this.props.onTabClick.bind(null,3)}>
							<Svg className='icon' name='bowl'></Svg>
							<span className="tabName">已完成</span>
						</a>
					</li>
				</ul>
			);
		}
	});

});