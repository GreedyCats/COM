define([
	'when',
	'React',
	'jsx!widget/header/main',
	'jsx!./homeBox/main',
	'jsx!widget/swiper/main',
	'package/fastclick/fastclick',
	'less!./home'
], function(when, React,Header,HomeBox,Swiper,FC){

	FC.attach(document.body);

	return React.createClass({
        getInitialState: function() {
        	this.boxList = [];
        	this.swiper = null;
        	this.currentIndex = 1;
            return {
				loadingStatus : 'hide'
            };
        },
		componentWillMount : function(){
			var self = this;
			$.ajax({
				method:'POST',
				type:'json',
				url:'/package/getTodayPackage',
				success:function(data){
					switch(data.status){
						case 'success':
							self.boxList = data.data.list;
							self.forceUpdate();
							break;
						case 'error':
							alert(data.message);
							break;
					}
				}
			})
		},
		onSlideChangeEnd:function(swiper){
			this.currentIndex = swiper.activeIndex + 1;
			$('.currentIndex').text(this.currentIndex);
		},
		getInstance:function(instance){
			this.swiper = instance;
		},
		swipe:function(direction){
			if (direction == 'next') {
				this.swiper.slideNext();
			}else if(direction == 'prev'){
				this.swiper.slidePrev();
			}
		},
		render: function () {
			var self = this;
			var headerData = {
				btn1:{
					href:'#gc_showMenu',
					icon:'menu'
				},
				btn2:{
					href:'',
					icon:'cat'
				}
			}

			return (
				<div className='pageHome'>
					<Header headerData={headerData}></Header>
					<div className='pagination'>
						<span className="currentIndex">{this.currentIndex}</span>
						<span className="line"></span>
						<span className="totolLength">{this.boxList.length}</span>
					</div>
					<Swiper className='homePageSwiper' onSlideChangeEnd={this.onSlideChangeEnd} getInstance={this.getInstance}>
						{
							self.boxList.map(function(boxData,index){
								return(<HomeBox data={boxData} swipe={self.swipe}></HomeBox>);							
							})
						}
					</Swiper>
				</div>
			);
		}
	});
});
