define(['React','less!./button'], function(React){

 return React.createClass({
    getInitialState: function() {
        return {
            enable: true,
            type : ""
        }
    },

 	  handleClick:function(e){
        if(this.state.enable){
           if (this.props.link) {
               window.location.href = this.props.link;
           }
           this.props.handleClick && this.props.handleClick();
        }
 	  },
       enable:function(){
           this.setState({
               enable:true
           })
       },

       disable:function(){
           this.setState({
               enable:false
           })
       },

      render: function () {
      	var className = [
              this.state.enable ? 'enable' : 'disable',
              this.props.type || 'normal',
              this.props.size || 'middle',
              this.props.bClass || '',
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
