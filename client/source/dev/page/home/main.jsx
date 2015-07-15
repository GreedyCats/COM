define([
	'when',
	'React',
	'jsx!widget/header/main',
	'jsx!./homeBox/main',
	'less!./home'
], function(when, React,Header,HomeBox){
	return React.createClass({
        getInitialState: function() {
        	this.boxList = [];
            return {
				loadingStatus : 'hide'
            };
        },
		componentWillMount : function(){
			var self = this;
			$.ajax({
				method:'POST',
				type:'json',
				url:'/package/getTodayPackage',
				success:function(data){
					switch(data.status){
						case 'success':
							self.boxList = data.data.list;
							self.forceUpdate();
							break;
						case 'error':
							alert(data.message);
							break;
					}
				}
			})
		},
		render: function () {
			var self = this;
			return (
				<div className="pageHome">
					{
						self.boxList.map(function(boxData,index){
							return(<HomeBox data={boxData}></HomeBox>);							
						})
					}
				</div>
			);
		}
	});
});
