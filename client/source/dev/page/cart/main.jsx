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
				cartList : [],
				totolPrice:0
            };
        },
		componentWillMount : function(){
			var self = this;
			//这里暂时只处理未登录的情况
			Bridge.checkLogin(function(isLogin){
				if (isLogin) {
					//登录后的逻辑
				}else{
					//本地存储
					self.setState({cartList:Bridge.storage.get('cartList') || []},function(){
						//获取数据接口
						
					});
				}
			})
			// $.ajax({
			// 	method:'POST',
			// 	type:'JSON',
			// 	url:'/package/getTodayPackage',
			// 	success:function(data){
			// 		switch(data.status){
			// 			case 'success':
			// 				self.boxList = data.data.list;
			// 				self.forceUpdate();
			// 				break;
			// 			case 'error':
			// 				alert(data.message);
			// 				break;
			// 		}
			// 	}
			// })
		},
		addCountById:function(){

		},
		subCountById:function(){

		},
		removeOneById:function(){

		},
		render: function () {
			var self = this;
			var totalCount = 0;
			this.state.cartList.forEach(function(item){
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
			return (
				<div className='pageCart'>
					<Header headerData={headerData}></Header>
					<div className="freeLabel">
						<span className='text'>免邮费</span>
						<Svg name='truck'></Svg>
					</div>
					<ul className="cartList">

					</ul>
					<div className='goPayBox'>
						<div className='content'>
							<div className='left'>
								<span className='total'>合计：</span>
		                        <div className='price'>
		                            <span className='rmb'>¥</span>
		                            <span className='integer'>0</span>
		                            <span className='decimal'>.0</span>
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
