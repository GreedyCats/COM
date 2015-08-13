define([
	'React',
	'jQuery',
	'jsx!widget/header/main',
	'less!./orderDetail'
],function(React, $, Header){
	return React.createClass({
		render: function(){
			var headerData = {
				btn1:{
					href:'#gc_back',
					icon:'back'
				},
				title:(<div className='title'>
							<span className='bigTitle'>订单详情</span>
						</div>)
			};
			var order = {
				time : '2017-07-02',
				orderID: '1234 2342 123',
				status: '1',
				statusDesc: '已发货',
				address: 'Home',
				totalPrice: '268.9',
				packageList: [
					{
						title: 'Summer Tea 夏日么么茶',
						price: '86.9',
						productList: [
							{
								thumbnail : '../../../uploads/productImage1.jpg',
								title: 'Battle Green 日本进口柠檬气泡酒',
								weight: '92.4',
								count: '2',
								price: '178.6'
							},
							{
								thumbnail : '../../../uploads/productImage1.jpg',
								title: 'Battle Green 日本进口柠檬气泡酒',
								weight: '92.4',
								count: '2',
								price: '178.6'
							}
						]
					},
					{
						title: 'Summer Tea 夏日么么茶',
						price: '86.9',
						productList: [
							{
								thumbnail : '../../../uploads/productImage1.jpg',
								title: 'Battle Green 日本进口柠檬气泡酒',
								weight: '92.4',
								count: '2',
								price: '178.6'
							},
							{
								thumbnail : '../../../uploads/productImage1.jpg',
								title: 'Battle Green 日本进口柠檬气泡酒',
								weight: '92.4',
								count: '2',
								price: '178.6'
							}
						]
					}
				]
			};
			var price = String(order.totalPrice).split('.');
			return (
				<div className='pageOrderDetail'>
					<Header headerData={headerData}></Header>
					<div className='orderDetail'>
						<div className='timeAndId'>
							<span className='time'>{order.time}</span>
							<div className='orderIDBox'>
								<span className="text">订单编号</span>
								<span className="orderID">{order.orderID}</span>
							</div>
						</div>
						<div className='statusAndAddress'>
							<span className='status'>
								{order.statusDesc}
								<Svg className='search' name='search'></Svg>
							</span>
							<span className='address'>{order.address}</span>
						</div>
						<ul className='packageList'>
						{	
							order.packageList.map(function(package, index){
								return (
									<li className='package'>
										<div className='headBox'>
											<Svg className='circle' name='circle'></Svg>
											<span className='packageTitle'>{package.title}</span>
											<span className='packagePrice'>¥{package.price}</span>
										</div>
										<ul className='productList'>
										{
											package.productList.map(function(product, index){
												return (
													<li className='product'>
														<a href='javascript:;' className='productWrapper'>
															<img className='thumbnail' src={product.thumbnail} />
															<div className='infos'>
																<p className='title'>{product.title}</p>
																<span className='weight'>{product.weight}g</span>
															</div>
															<div className='count'>
																<span className='multiSign'>X</span>
																<span>{product.count}</span>
															</div>
															<del className='price'>{product.price}</del>
														</a>
													</li>
												);
											})
										}		
										</ul>
									</li>
								);
							})
						}
						</ul>
						<div className='totalPrice'>
							<span>合计：</span>
							<span className='rmb'>¥</span>
							<span className='integer'>{price && price[0] || 0}</span>
                            <span className='decimal'>.{price && price[1] || 0}</span>
						</div>
					</div>
				</div>
			);
		}
	})
})