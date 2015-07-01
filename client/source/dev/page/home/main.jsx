define([
	'when',
	'React',
	'less!./home'
], function(when, React){
	return React.createClass({
        getInitialState: function() {
            return {
				loadingStatus : 'hide'
            };
        },
		render: function () {
			return (
				<div className="pageHome">
					
				</div>
			);
		},
		componentDidMount : function(){
			
		}
	});
});
