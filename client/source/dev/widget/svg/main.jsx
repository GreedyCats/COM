define(['React','require','jQuery','less!./svg'], function(React,require,$){

  var REG_SVG_WIDTH = /(\<svg[^\<]*width=\")(\S*)(\"[^\<]*\>)/gmi;
  var REG_SVG_HEIGHT = /(\<svg[^\<]*height=\")(\S*)(\"[^\<]*\>)/gmi;
  var xmlSerializer = new XMLSerializer();
  var Svg = React.createClass({
     getInitialState:function(){
       return {
         loaded:false
       }
     },
     componentWillMount:function(){
         this.renderSVG();
     },
     render: function () {
         var name = "vector " + this.props.className;
         return (
           <span {...this.props} className={name} dangerouslySetInnerHTML={{__html: this.svgStr}}></span>
         );
        },
     componentWillReceiveProps:function(){
        this.renderSVG();
     },
     setName:function(newName){
        this.renderSVG(newName);
     },
     renderSVG:function(newName){
        var svgName = newName || this.props.name;
         var self = this;
         require(['text!./'+svgName+'.svg'],function(str){
           str = str.replace(
          REG_SVG_WIDTH,
          function(match, $1, $2, $3){
            return $1 + "100%" + $3;
          })
                    .replace(
                    REG_SVG_HEIGHT,
          function(match, $1, $2, $3){
            return $1 + "100%" + $3;
          });
           var $str = $($.parseXML(str)).find('svg')[0];
           var str = xmlSerializer.serializeToString($str);
           self.svgStr = str;
           self.setState({loaded:true});
         })
     }
 });
    window.Svg = Svg;
 return Svg;
});
