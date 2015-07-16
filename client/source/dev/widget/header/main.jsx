define(['React','less!./header'], function(React){
    return React.createClass({
        render : function(){
        	var self = this;
        	var data = this.props.headerData || {};
        	if (data.hasOwnProperty('btn1')) {
        		if (data.btn1.hasOwnProperty('icon')) {
        			var icon = <Svg className='headerIcon' name={data.btn1.icon}></Svg>;
        		};
        		if (data.btn1.hasOwnProperty('text')) {
        			var text = <span className='text'>{data.btn1.text}</span>;
        		};
        		var btn1 = (<a className='headerBtn btn1' href={data.btn1.href || 'javascript:;'} icon={data.btn1.icon} onClick={data.btn1.onClick}>
		        				{text}
		        				{icon}
		        			</a>);
        	};
        	if (data.hasOwnProperty('btn2')) {
        		if (data.btn2.hasOwnProperty('icon')) {
        			var icon = <Svg className='headerIcon' name={data.btn2.icon}></Svg>;
        		};
        		if (data.btn2.hasOwnProperty('text')) {
        			var text = <span className='text'>{data.btn2.text}</span>;
        		};
        		var btn2 = (<a className='headerBtn btn2' href={data.btn2.href || 'javascript:;'} icon={data.btn2.icon} onClick={data.btn2.onClick}>
        						{text}
		        				{icon}
        					</a>);
        	};
            return (
                <header className='commonHeader'>
                	{btn1}
                	{btn2}
                </header>
            )
        }
    });
});
