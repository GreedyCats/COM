define([
	'when',
	'React',
	'jsx!widget/header/main',
	'package/fastclick/fastclick',
	'less!./cart'
], function(when, React,Header,FC){

	FC.attach(document.body);
	
	return React.createClass({
        getInitialState: function() {
            return {
				cartListInfo:[],
				totalPrice:0
            };
        },
		componentWillMount : function(){
			var self = this;
			//这里暂时只处理未登录的情况
			Bridge.checkLogin(function(isLogin){
				if (isLogin) {
					//登录后的逻辑
				}else{
					//获取数据接口
					$.ajax({
						method:'POST',
						type:'JSON',
						url:'/cart/getCartListInfo',
						data:{
							cartList:Bridge.storage.get('cartList')|| []
						},
						success:function(data){
							switch(data.status){
								case 'success':
									self.setState({
										cartListInfo:data.data.cartListInfo,
										totalPrice:data.data.totalPrice
									});
									break;
								case 'error':
									alert(data.message);
									break;
							}
						},
						error:function(err){
							console.log(err);
						}
					})
				}
			})
		},
		componentDidMount:function(){
			var touchStart = 0;
			var translateX = 0;
			//添加左滑删除事件
			$('.cartList').on('touchstart','.packageWrapper',function(e){
				touchStart = e.originalEvent.touches[0].clientX;
			})
			$('.cartList').on('touchmove','.packageWrapper',function(e){
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
			$('.cartList').on('touchend','.packageWrapper',function(e){
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
		addCountById:function(packageID){
            var cartListInfo = this.state.cartListInfo;
            var self = this;
            cartListInfo.forEach(function(item){
                if (item._id == packageID){
                    item.count ++ ;
                    return;
                }
            });
            this.setState({
            	cartListInfo: cartListInfo
            },function(){
                self.setLocalStorage();
                self.getTotalPrice();
            });
		},
		subCountById:function(packageID){
			var cartListInfo = this.state.cartListInfo;
            var self = this;
            cartListInfo.forEach(function(item){
                if (item._id == packageID){
                	if (item.count === 1) {
                		self.removeOneById(packageID);
                	}else{
                    	item.count -- ;
                	}
                    return;
                }
            });
            this.setState({
            	cartListInfo: cartListInfo
            },function(){
                self.setLocalStorage();
                self.getTotalPrice();
            });
		},
		removeOneById:function(packageID){
			var self = this;
			var willDelete = confirm('删除？');
			if (willDelete){
				var cartListInfo = this.state.cartListInfo;
	            var self = this;
	            var deleteIndex = 0;
	            cartListInfo.forEach(function(item, index){
	                if (item._id == packageID){
	                	deleteIndex = index;
	                	item.readyDelete = true;
	                    return;
	                }
	            });
	            this.forceUpdate(function(){
	            	 setTimeout(function(){
			            cartListInfo.splice(deleteIndex, 1);
			            self.setState({
			            	cartListInfo: cartListInfo
			            },function(){
			                self.setLocalStorage();
			                self.getTotalPrice();
			            });
					},300)
	            })
			}
		},
		getTotalPrice: function(){
	        var self = this;
	        $.ajax({
	            method:'POST',
	            type:'JSON',
	            url:'/cart/getTotalPrice',
	            data:{
	                cartList:Bridge.storage.get('cartList')
	            },
	            success:function(data){
	                switch(data.status){
	                    case 'success':
	                        self.setState({totalPrice:data.data.totalPrice});
	                        break;
	                    case 'error':
	                        alert(data.message);
	                        break;
	                }
	            },
	            error:function(err){
	                alert(err);
	            }
	        });
	    }, 
		setLocalStorage:function(){
			var cartList = [];
			this.state.cartListInfo.forEach(function(item,index){
				var newObj = {
					packageID:item._id,
					count:item.count
				}
				cartList.push(newObj);
			});
			Bridge.storage.set('cartList', cartList);
		},
		render: function () {
			var self = this;
			var totalCount = 0;
			this.state.cartListInfo.forEach(function(item){
	            totalCount += item.count;
	        });
			var headerData = {
				btn1:{
					href:'#gc_back',
					icon:'back'
				},
				title:(<div className='title'>
							<span className="bigTitle">购物车</span>
							<span className="smallTitle">({totalCount})</span>
						</div>)
			}
			var price = String(this.state.totalPrice).split('.');
			return (
				<div className='pageCart'>
					<Header headerData={headerData}></Header>
					<div className="freeLabel">
						<span className='text'>免邮费</span>
						<Svg name='truck'></Svg>
					</div>
					<ul className="cartList">
						{
							this.state.cartListInfo.map(function(package,index){
								var clz = package.readyDelete ? 'removeByTransform' : undefined;
								return (<li ref={package._id} className={clz}>
											<div className="packageWrapper">
												<img src={package.thumbnail} alt={package.title} className="packageThumb"/>
												<div className="infoBox">
													<span className="title">{package.title}</span>
													<span className="price">¥{package.price}</span>
												</div>
												<div className="countBox">
													<span className="subBtn btn" onClick={self.subCountById.bind(self,package._id)}>
														<Svg className="icon" name='sub'></Svg>
													</span>
													<span className="curCount">{package.count}</span>
													<span className="addBtn btn" onClick={self.addCountById.bind(self,package._id)}>
														<Svg className="icon" name='add2'></Svg>
													</span>
												</div>
											</div>
											<div className="deleteBtn" onClick={self.removeOneById.bind(self,package._id)}>
												<Svg className="icon" name='delete'></Svg>
											</div>
										</li>)
							})
						}
					</ul>
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
								去结算
							</div>
						</div>
					</div>
				</div>
			);
		}
	});
});
