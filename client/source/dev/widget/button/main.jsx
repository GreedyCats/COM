define(['React','less!./button'], function(React){

 return React.createClass({
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
        var href = this.props.href ? this.props.href : 'javascript:;';
        var onClickFunc = this.props.onClick ? this.props.onClick : null;
      return (
        	<a className={className} href={href} onClick={onClickFunc} >
            {icon}
            {this.props.text || ''}
          </a>
      );
    }
  });
});
