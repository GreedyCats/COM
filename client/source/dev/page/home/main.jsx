define([
	'when',
	'React',
	'jsx!./productList/main',
	'less!./home'
], function(when, React, ProductList){
	return React.createClass({
        getInitialState: function() {
        	this.productList = [];
            return {
				loadingStatus : 'hide'
            };
        },
		componentDidMount : function(){
			var self = this;
			$.ajax({
				method:'POST',
				type:'json',
				url:'/package/getTodayPackage',
				success:function(data){
					switch(data.status){
						case 'success':
							console.log(data.data);
							break;
						case 'error':
							alert(data.message);
							break;
					}
				}
			})
		},
		render: function () {
			return (
				<div className="pageHome">
					<ProductList></ProductList>
				</div>
			);
		}
	});
});
