define([
	'React',
	'jQuery',
	'less!./productList'
],function(React, $){

	return React.createClass({
		getInitialState: function(){
			return {}
		},
		componentDidMount: function(){
			// console.log(this.props.data);
		},
		render: function(){
			return (
				<ul className='productList'>
				{
					this.props.data.map(function(product, index){
						return (
							<li className='productItem'>
								<a href={"#gc_goDetail?productID="+product._id} className="productWrapper">
									<img className='thumbnail' src={product.thumbnail} />
									<div className='infos'>
										<p className='title'>{product.title}</p>
										<div className='evaluations'>
											<Svg name='paws' className='paws'></Svg>
	                            			<Svg name='paws' className='paws'></Svg>
	                            			<Svg name='paws' className='paws'></Svg>
										</div>
										<div className="subTitle">
											<img className="countryFlag" src={product.country ? product.country.flagUrl : ''} />
											<span className="weight">{product.weight}/盒</span>
										</div>
									</div>
									<div className="count">
										<span className="multiSign">X</span>
										<span>{product.count}</span>
									</div>
								</a>
							</li>
						);
					})
				}
				</ul>
			);
		}
	});

});