define([
	'React',
	'jQuery',
	'less!./productList.less'
],function(React, $){

	return React.createClass({
		getInitialState: function(){
			return {
				productList: []
			}
		},
		componentDidMount: function(){
			var productList = [{
				title: 'SANRITSU三立 韩国进口巧克力夹心饼干',
				weight: '92.4g',
				thumbnail: '/uploads/productImage1.jpg',
				countryFlag: '/uploads/korea.jpg',
				count: 2
			},{
				title: 'SANRITSU三立 韩国进口巧克力夹心饼干',
				weight: '92.4g',
				thumbnail: '/uploads/productImage1.jpg',
				countryFlag: '/uploads/korea.jpg',
				count: 2
			},{
				title: 'SANRITSU三立 韩国进口巧克力夹心饼干',
				weight: '92.4g',
				thumbnail: '/uploads/productImage1.jpg',
				countryFlag: '/uploads/korea.jpg',
				count: 2
			}];
			this.setState({
				productList: productList
			});
		},
		render: function(){
			return (
				<ul className='productList'>
				{
					this.state.productList.map(function(product, index){
						return (
							<li className="productItem">
								<img className="thumbnail" src={product.thumbnail} />
								<div className="infos">
									<p className="title">{product.title}</p>
									<div className="subTitle">
										<img className="countryFlag" src={product.countryFlag} />
										<span className="weight">{product.weight}/盒</span>
									</div>
								</div>
								<div className="count">
									<span className="multiSign">X</span>
									<span>{product.count}</span>
								</div>
							</li>
						);
					})
				}
				</ul>
			);
		}
	});

});