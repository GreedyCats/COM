define([
	'React', 
	'jQuery',
	'less!./comment'
], function(React, $){
	return React.createClass({
		getInitialState: function(){
			return ({});
		},
		render: function(){
			return (
				<div className='commentBox'>
					<div className='commentTop'>
						<div className='totalInfos'>
							<div className='left 5'>
								<Svg name='paws' className='paws'></Svg>
	                            <Svg name='paws' className='paws'></Svg>
	                            <Svg name='paws' className='paws'></Svg>
	                            <Svg name='paws' className='paws'></Svg>
	                            <Svg name='paws' className='paws gray'></Svg>
							</div>
							<div className='right'>
								<span className='percent'>98</span>
								好评
							</div>
						</div>
						<ul className='selectorList'>
							<li className='active' data-value='0' >
								全部
							</li>&nbsp;
							<li className='' data-value='1'>
								好评
							</li>&nbsp;
							<li className='' data-value='2'>
								中评
							</li>&nbsp;
							<li className='' data-value='3'>
								差评
							</li>&nbsp;
							<li className='' data-value='4'>
								有图
							</li>&nbsp;
							<li className='noBorder'>&nbsp;</li>&nbsp;
							<li className='justifyFix'>&nbsp;</li>
						</ul>
					</div>
					<ul className='commentList'>
						<li className='commentItem'>
							<div className='head'>
								<div className='name left'>
									weixin_clien
								</div>
								<div className='from left'>
									来自一号店的评价
								</div>
								<div className='time right'>
									2015-07-06
								</div>
							</div>
							<div className='grades 5'>
								<Svg name='paws' className='paws'></Svg>
	                            <Svg name='paws' className='paws'></Svg>
	                            <Svg name='paws' className='paws'></Svg>
	                            <Svg name='paws' className='paws'></Svg>
	                            <Svg name='paws' className='paws gray'></Svg>
							</div>
							<div className='text'>
								真心的不错，虽然是老顾客了，但是不得不说，星纯家的东西真的好，质量好，服务好，而且每次送的赠品小样又多样式又全，我觉得在淘宝能有这样一家值得信任的店家，真心不错的。这款洁面乳我买了好多次了，之前是白色的包装，跟这个差不多，效果还是和之前一样，洗完之后，脸很润，一点都不刺激，会继续支持的老板要多给优惠啊(ˇ?ˇ) ～。
							</div>
							<ul className='pics'>
								<li>
									<img src='/uploads/productImage3.png'/>
								</li>
								<li>
									<img src='/uploads/productImage2.png'/>
								</li>
							</ul>
						</li>
						<li className='commentItem'>
							<div className='head'>
								<div className='name left'>
									weixin_clien
								</div>
								<div className='from left'>
									来自一号店的评价
								</div>
								<div className='time right'>
									2015-07-06
								</div>
							</div>
							<div className='grades 5'>
								<Svg name='paws' className='paws'></Svg>
	                            <Svg name='paws' className='paws'></Svg>
	                            <Svg name='paws' className='paws'></Svg>
	                            <Svg name='paws' className='paws gray'></Svg>
	                            <Svg name='paws' className='paws gray'></Svg>
							</div>
							<div className='text'>
								呵呵哒还不错嘛。
								啦啦啦啦。
							</div>
							<ul className='pics'>
								
							</ul>
						</li>	
					</ul>
				</div>
			)
		}
	});
});