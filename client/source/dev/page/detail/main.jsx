define([
	'when',
	'React',
	'jQuery',
	'less!./detail'
], function(when, React, $) {
	return React.createClass({
		getInitialState: function(){
			return {}
		},
		render: function(){
			var self = this;
			return (
				<div className='pageDetail'>
					<div className='topBox'>
						<img className='topImage' src='/uploads/productImage2.png' />
						<p className='title'>
							三立 韩国进口巧克力夹心饼干
						</p>
						<p className='subTitle'>
							Lorem ipsum dolor sit amet, consectetur
						</p>
						<div className='topOtherInfo'>
							<div className='leftBox'>
								<img className='countryFlag' src='/uploads/korea.jpg' />
								<span className='weight'>92.4g/盒</span>
							</div>
							<div className='rightBox'>
								<span>原价：</span>
								<del>¥<span>68.0</span></del>
							</div>
						</div>
					</div>
					<div className='middleLine'></div>
					<div className='bottomBox'>
						<div className='tabList'>
							<div className='tabItem active'>
								<p className='tabTitle'>规格参数</p>
								<p className='tabSubtitle'>Specification</p>
							</div>
							<div className='tabItem'>
								<p className='tabTitle'>规格参数</p>
								<p className='tabSubtitle'>Specification</p>
							</div>
							<div className='tabItem'>
								<p className='tabTitle'>规格参数</p>
								<p className='tabSubtitle'>Specification</p>
							</div>
							<div className='tabItem'>
								<p className='tabTitle'>规格参数</p>
								<p className='tabSubtitle'>Specification</p>
							</div>
							<div className='tabItem'>
								<p className='tabTitle'>规格参数</p>
								<p className='tabSubtitle'>Specification</p>
							</div>
							<div className='tabItem'>
								<p className='tabTitle'>规格参数</p>
								<p className='tabSubtitle'>Specification</p>
							</div>
							<div className='tabItem'>
								<p className='tabTitle'>规格参数</p>
								<p className='tabSubtitle'>Specification</p>
							</div>
						</div>
					</div>
				</div>
			);
		}
	});
});