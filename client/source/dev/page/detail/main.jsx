define([
	'when',
	'React',
	'jQuery',
	'jsx!widget/header/main',
	'jsx!widget/swiper/main',
	'jsx!./comment/main',
	'package/fastclick/fastclick',
	'less!./detail'
], function(when, React, $, Header ,Swiper, Comment,FC) {

	FC.attach(document.body);

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
			this.swiper = instance;
		},
		componentDidMount:function(){
			//获取数据
			// this.productID = location.
			$.ajax({
				method:'POST',
				type:'JSON',
				url:'/product/getProductById',
				data:{
					productID:'aaaa'
				},
				success:function(data){
					console.log(data);
				},
				error:function(err){
					console.log(err)
				}
			})
		},
		swipe:function(currentIndex){
			this.swiper && this.swiper.slideTo(currentIndex);
		},
		render: function(){
			var self = this;
			var headerData = {
				btn1:{
					href:'#gc_goBack',
					icon:'back'
				}
			}
			return (
				<div className='pageDetail'>
					<Header headerData={headerData}></Header>
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
							<div className='specificationBox'>
								<ul>
									<li>
										<ul className='firstInfo'>
											<li>
												<span className='infoTitle'>产地：</span>
												<span>韩国</span>
											</li>
											<li>
												<span className='infoTitle'>是否含糖：</span>
												<span>含糖</span>
											</li>
											<li>
												<span className='infoTitle'>生活方式：</span>
												<span>早餐/正餐/小资/diy/节日/上班族</span>
											</li>
											<li>
												<span className='infoTitle'>净重(g)：</span>
												<span>350</span>
											</li>
											<li>
												<span className='infoTitle'>包装：</span>
												<span>盒装</span>
											</li>
											<li>
												<span className='infoTitle'>口味：</span>
												<span>其他口味</span>
											</li>
											<li>
												<span className='infoTitle'>食品保质期：</span>
												<span>540</span>
											</li>
										</ul>
									</li>
									<li>
										<p className='infoTitle'>包装清单：</p>
										<p>由于厂商产品批次不同，具体包装清单可能各有不同</p>
									</li>
									<li>
										<p className='infoTitle'>过敏信息：</p>
										<p>本产品配料中含有质的谷物、豆类、乳类、蛋类</p>
									</li>
								</ul>
							</div>
							<div className='pictureBox'>
								<img width='100%' src='/uploads/productImage3.png'/>
								<img width='100%' src='/uploads/productImage2.png'/>
							</div>
							<Comment></Comment>
						</Swiper>
					</div>
				</div>
			);
		}
	});
});