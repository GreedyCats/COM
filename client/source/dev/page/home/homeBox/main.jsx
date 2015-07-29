define(['React','jsx!../productList/main','jsx!widget/button/main','less!./homeBox'], function(React,ProductList,Button){

 return React.createClass({
    getInitialState: function() {
        return {};
    },
    componentWillMount:function(){
        this.boxData= this.props.data || {};
    },
    render: function () {
        var self = this;
        var candy;
        switch (this.boxData.type){
            case 0:
                candy = (<div className='candys'>
                            <Svg name='candy' className='candy'></Svg>
                            <Svg name='candy' className='candy'></Svg>
                        </div>);
                break;
            case 1:
                candy = (<div className='candys'>
                            <Svg name='candy' className='candy'></Svg>
                            <Svg name='candy' className='candy'></Svg>
                            <Svg name='candy' className='candy'></Svg>
                        </div>);
                break;
            case 2:
                candy = (<div className='candys'>
                            <Svg name='candy' className='candy'></Svg>
                            <Svg name='candy' className='candy'></Svg>
                            <Svg name='candy' className='candy'></Svg>
                            <Svg name='candy' className='candy'></Svg>
                        </div>);
                break;
        }
        return (
            <div className='homeBox'>
                <div className='head_img' style={{backgroundImage:'url('+this.boxData.packageImage+')'}}></div>
                <div className='info'>
                    <div className='content'>
                        <a href='javascript:;' className='pageBtn prev' onClick={this.props.swipe.bind(null,'prev')}>
                            <Svg name='prev' className='icon'></Svg>
                        </a>
                        <a href='javascript:;' className='pageBtn next' onClick={this.props.swipe.bind(null,'next')}>
                            <Svg name='next' className='icon'></Svg>
                        </a>
                        <div className='info_box'>
                            <span className='title'>{this.boxData.title}</span>
                            <span className='subTitle'>{this.boxData.subTitle}</span>
                            <div className='priceAndType'>
                                <div className='priceBox'>
                                    <span className='price'>{this.boxData.price}</span>
                                    <span className='oldPrice'>
                                        <span>原价：</span>
                                        <del>¥{this.boxData.originalPrice}</del>
                                    </span>
                                </div>
                                <div className='type'>
                                    {candy}
                                    <span className='typeInfo'>{this.boxData.typeName}</span>
                                </div>
                            </div>
                            <Button text='加入购物车' className='addCart' onClick={this.props.addCart && this.props.addCart.bind(null, this.boxData)}></Button>
                        </div>
                        <ProductList data={self.boxData.products || []}></ProductList>
                    </div>
                </div>
            </div>
        );
    }
  });
});
