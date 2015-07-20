define([
	'React',
	'jQuery',
	'jsx!./menu/main',
	'less!./menu'
],function(React, $,Menu){
	return React.createClass({
		render: function(){
			return (
				<Menu></Menu>
			);
		}
	});

});