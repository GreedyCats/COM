define(['React','jsx!../productList/main','less!./homeBox'], function(React,ProductList){

 return React.createClass({
    getInitialState: function() {
        return {};
    },
    componentWillMount:function(){
        this.boxData= this.props.data || {};
    },
    render: function () {
        var self = this;
        return (
            <div className='homeBox'>
                <div className='head_img' style={{backgroundImage:'url('+this.boxData.packageImage+')'}}></div>
                <div className='info'>
                    <div className='content'>
                        <div className='info_box'>
                            <span className='title'>{this.boxData.title}</span>
                            <span className='subTitle'>{this.boxData.subTitle}</span>
                            <div className='priceAndType'>
                                <div className='priceBox'>
                                    <span className='price'></span>
                                    <span className='oldPrice'></span>
                                </div>
                                <div className='type'>
                                    <span className='typeInfo'></span>
                                </div>
                            </div>
                        </div>
                        <ProductList data={self.boxData.products || []}></ProductList>
                    </div>
                </div>
            </div>
        );
    }
  });
});
