define(['React','jQuery', 'swiper', 'less!./swiper'], function(React, $){
    return React.createClass({
        componentDidUpdate:function(){
            var $content = $(this.refs.contentHolder.getDOMNode());
            $content.children().addClass('swiper-slide');
            var packageSwiper = new Swiper('.inactSwiper',this.props);
            this.props.getInstance && this.props.getInstance(packageSwiper);
        },
        render : function(){
            return (
                <div className={'inactSwiper '+this.props.className}>
                    <div ref='contentHolder' className='swiper-wrapper'>
                        {this.props.children}
                    </div>
                </div>
            )
        }
    });
});
