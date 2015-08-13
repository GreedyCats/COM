define([
	'React',
	'jQuery',
	'jsx!./orderTab/main',
	'jsx!./orderList/main',
	'jsx!widget/header/main',
	'less!./myOrder'
],function(React, $,OrderTab,OrderList,Header){
	return React.createClass({
		getInitialState: function() {
			this.orderList = [];
            return {
				orderStatus:0
            };
        },
        componentDidMount:function(){
        	//请求当前状态的order数据
        	var self = this;
        	$.ajax({
        		url:'/order/getOrderList',
        		method:'POST',
        		type:'JSON',
        		data:{
        			orderStatus:0
        		},
        		success:function(data){
        			switch(data.code){
        				case 1:
        					self.orderList = data.data;
        					self.forceUpdate();
        					break;
        				default:
        					break;
        			}
        		},
        		error:function(){

        		}
        	})
        },
        removeOrderByID:function(orderID,next){
            $.ajax({
                method:'post',
                url:'/order/deleteByOrderID',
                data:{
                    orderID:orderID
                },
                success:function(data){
                    switch (data.code){
                        case 1:
                            next({
                                status:true
                            });
                            break;
                        default:
                            break;
                    }
                }
            })
        },
        updateData:function(){
            this.changeStatus(this.state.orderStatus);
        },
        changeStatus:function(status){
        	var self = this;
        	$.ajax({
        		url:'/order/getOrderList',
        		method:'POST',
        		type:'JSON',
        		data:{
        			orderStatus:status
        		},
        		success:function(data){
        			switch(data.code){
        				case 1:
        					self.orderList = data.data;
        					self.setState({
				        		orderStatus:status
				        	})
        					break;
        				default:
        					break;
        			}
        		},
        		error:function(){

        		}
        	})
        },
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
					<OrderTab onTabClick={this.changeStatus} selected={this.state.orderStatus}></OrderTab>
					<OrderList updateData={this.updateData} onRemove={this.removeOrderByID} orderList={this.orderList}></OrderList>
				</div>
			);
		}
	});

});