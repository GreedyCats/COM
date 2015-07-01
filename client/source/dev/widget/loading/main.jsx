define(['React','less!./loading'], function(React){
    return React.createClass({
        render : function(){
            return (
                <div className={'loadingAnim ' + this.props.status}></div>
            )
        }
    });
});
