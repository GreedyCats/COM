define([
	'React',
	'jQuery',
	'less!./orderList'
],function(React, $){
	return React.createClass({
		getInitialState: function() {
            return {
				orderList:[]
            };
        },
		removeOneById:function(orderID){
			var self = this;
			var willDelete = confirm('删除？');
			if (willDelete){
				this.props.onRemove && this.props.onRemove(orderID,function(removeInfo){
					if (removeInfo.status) {
						//删除成功了
						self.props.updateData && self.props.updateData();
					};
				});
			}
		},
		componentDidUpdate:function(){

		},
		componentDidMount:function(){
			var touchStart = 0;
			var translateX = 0;
			//添加左滑删除事件
			$('.orderList').on('touchstart','.orderWrapper',function(e){
				touchStart = e.originalEvent.touches[0].clientX;
			})
			$('.orderList').on('touchmove','.orderWrapper',function(e){
				var curX = e.originalEvent.touches[0].clientX;
				translateX = curX - touchStart;
				if (Math.abs(translateX) > 10 && !$(this).hasClass('open')) {
					e.preventDefault();
					$(this).css({
						transform:'translate3d('+translateX+'px,0,0)'
					})
					if (translateX >=  -65) {
						$(this).next().css({
							transform:'translate3d('+translateX+'px,0,0)'
						})
					}else{
						$(this).next().css({
							transform:'translate3d(-65px,0,0)'
						})
					}
				};
			})
			$('.orderList').on('touchend','.orderWrapper',function(e){
				var self = this;
				$(this).addClass('transform').next().addClass('transform');
				if (!$(this).hasClass('open')) {
					if (translateX > -45) {
						$(this).css({
							transform:'translate3d(0,0,0)'
						})
						$(this).next().css({
							transform:'translate3d(0,0,0)'
						})

					}else{
						$(this).css({
							transform:'translate3d(-65px,0,0)'
						}).addClass('open');
						$(this).next().css({
							transform:'translate3d(-65px,0,0)'
						})
					}
				}else{
					$(this).css({
						transform:'translate3d(0,0,0)'
					}).removeClass('open')
					$(this).next().css({
						transform:'translate3d(0,0,0)'
					})
				}
				setTimeout(function(){
					$(self).removeClass('transform').next().removeClass('transform');
				},300)
			})
		},
		formatDate:function(createTime){
			var date = new Date(createTime);
			return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
		},
		render: function(){
			var self = this;
			var orderList = this.props.orderList || [];
			return (
				<ul className="orderList">
					{
						orderList.map(function(order,index){

							var packageWrapper;
							if (order.packageList.length > 1) {
								packageWrapper = (
										<a href="#" className="orderInfo">
											{
												order.packageList.map(function(package,index){
													return (
														<div className="packageWrapper">
															<img className='packageImg' src={package.thumbnail} alt=""/>
														</div>
														)
												})
											}
										</a>
									)
							}else{
								packageWrapper = (
										<a href="#" className="orderInfo">
											<div className="packageWrapper">
												<img className='packageImg' src={order.packageList[0].thumbnail} alt=""/>
												<span className="title">{order.packageList[0].title}</span>
											</div>
										</a>
									)
							}

							return (
								<li>
									<div className="orderWrapper">
										<div className="timeAndPrice">
											<span className="time">{self.formatDate(order.createTime)}</span>
											<span className="price">¥{order.price}</span>
										</div>
										{packageWrapper}
										<div className="btnBox">
											<a href="#" className="check">查看物流</a>
											<a href="#" className="ensure">确认收货</a>
										</div>
									</div>
									<div className="deleteBtn" onClick={self.removeOneById.bind(null,order.orderID)}>
										<Svg className="icon" name='delete'></Svg>
									</div>
								</li>
								)
						})
					}
				</ul>
			);
		}
	});

});