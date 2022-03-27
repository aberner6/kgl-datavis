var w = 1000;
var h = 500;
var myCirc;

var svg = d3.select("body").append("svg")
      .attr("width",w)
      .attr("height",h)
      .style("background-color","black")


myCirc = svg
    .append('circle')
    .attr('cx',function(){
      return w/2;
      // if(blah>0){
      //   return w/2;
      // }  else{}
    })
    .attr('cy',h/2)
    .attr('r',10)
    .attr('fill','white')


d3.select("#slider").on("input", function() {
  update(+this.value);
});

function update(val){
  myCirc
    .transition()
    .attr('r', val)
}
