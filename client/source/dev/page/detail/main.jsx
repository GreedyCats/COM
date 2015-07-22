define([
	'when',
	'React',
	'jQuery',
	'jsx!widget/swiper/main',
	'less!./detail'
], function(when, React, $, Swiper) {
	return React.createClass({
		getInitialState: function(){
			this.swiper = null;
			return {
				currentIndex: 0
			}
		},
		onSlideChangeEnd:function(swiper){
			this.setState({
				currentIndex: swiper.activeIndex
			});
		},
		getInstance:function(instance){
			console.log(instance);
			this.swiper = instance;
		},
		swipe:function(currentIndex){
			this.swiper && this.swiper.slideTo(currentIndex);
		},
		render: function(){
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
					<div className='bottomBox'>
						<ul className='tabList'>
							<li className={this.state.currentIndex == 0 ? 'tabItem active' : 'tabItem'} onClick={this.swipe.bind(this, 0)}>
								<p className='tabTitle'>规格参数</p>
								<p className='tabSubtitle'>Specification</p>
							</li>&nbsp;
							<li className={this.state.currentIndex == 1 ? 'tabItem active' : 'tabItem'} onClick={this.swipe.bind(this, 1)}>
								<p className='tabTitle'>商品图片</p>
								<p className='tabSubtitle'>Good pictures</p>
							</li>&nbsp;
							<li className={this.state.currentIndex == 2 ? 'tabItem active' : 'tabItem'} onClick={this.swipe.bind(this, 2)}>
								<p className='tabTitle'>商品评价</p>
								<p className='tabSubtitle'>Good comment</p>
							</li>&nbsp;
							<li className='justifyLine'>&nbsp;</li>
						</ul>
						<Swiper className='detailPageSwiper' onSlideChangeEnd={this.onSlideChangeEnd} getInstance={this.getInstance}>
							<div className='specificationBox'>规格</div>
							<div className='pictureBox'>图片</div>
							<div className='commentBox'>评论</div>
						</Swiper>
					</div>
				</div>
			);
		}
	});
});