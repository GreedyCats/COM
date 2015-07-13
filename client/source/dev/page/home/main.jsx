define([
	'when',
	'React',
	'jsx!./productList/main',
	'less!./home'
], function(when, React, ProductList){
	return React.createClass({
        getInitialState: function() {
            return {
				loadingStatus : 'hide'
            };
        },
		render: function () {
			return (
				<div className="pageHome">
					<ProductList></ProductList>
				</div>
			);
		},
		componentDidMount : function(){
			
		}
	});
});
