define(['React','less!./button'], function(React){

 return React.createClass({
    getInitialState: function() {
        return {
            type : ""
        }
    },
 	  handleClick:function(e){
        
 	  },
    render: function () {
    	var className = [
            this.props.type || 'normal',
            this.props.size || 'middle',
            this.props.className || '',
            'commonButton'
        ].join(" ");
        if(this.props.icon){
            var icon = <Svg name={this.props.icon}></Svg>;
        }
      return (
        	<a className={className} href="javascript:;" onClick={this.handleClick} >
            {icon}
            {this.props.text || ''}
          </a>
      );
    }
  });
});
