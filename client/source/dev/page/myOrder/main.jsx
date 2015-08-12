define([
	'React',
	'jQuery',
	'jsx!./orderTab/main',
	'jsx!widget/header/main',
	'less!./myOrder'
],function(React, $,OrderTab,Header){
	return React.createClass({
		render: function(){
			var headerData = {
				btn1:{
					href:'#gc_back',
					icon:'back'
				},
				title:(<div className='title'>
							<span className="bigTitle">我的订单</span>
						</div>)
			}
			return (
				<div className="pageMyOrder">
					<Header headerData={headerData}></Header>
					<OrderTab selected={0}></OrderTab>
				</div>
			);
		}
	});

});