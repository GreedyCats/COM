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
				list : [{

				}]
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
					console.log(Bridge.storage.get('cartList'));
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
			var headerData = {
				btn1:{
					href:'#gc_back',
					icon:'back'
				},
				title:(<div className='title'>
							<span className="bigTitle">购物车</span>
							<span className="smallTitle">({this.state.list.length})</span>
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
				</div>
			);
		}
	});
});
