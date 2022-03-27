var w = 1000;
var h = 500;
var rad = 50;
var leftMargin = rad*2;
var someNum = 50;
var svg = d3.select("body").append("svg")
      .attr("width",w)
      .attr("height",h)
      .style("background-color","black")

var tranSpeed = 2000;//35700/2
var milky = svg.append("circle")
    .attr("cx", 0)
    .attr("cy", h-leftMargin)
    .attr("fill","white")
    .attr("r", 10)
    .transition()
    .duration(tranSpeed) //3.57 seconds
    .attr("cx", w/4)
    .attr("cy", h-h/4)
    .transition()
    .duration(tranSpeed) //3.57 seconds
    .attr("cx", w/2) 
    .attr("cy", h/2) 

var andro = svg.append("circle")
    .attr("cx", w)
    .attr("cy", leftMargin)
    .attr("fill","pink")
    .attr("r", 10)
    .transition()
    .duration(tranSpeed) //3.57 seconds
    .attr("cx", w*3/4)
    .attr("cy", h/4)
    .transition()
    .duration(tranSpeed) //3.57 seconds
    .attr("cx", w/2) 
    .attr("cy",h/2)

  var myText = svg.append("text")
    .attr("x",w/2)
    .attr("y",h/2)
    .style("fill","white")
    .style("font-family", "var(--sans-serif)")
    .style("font-variant-numeric", "tabular-nums")
    .attr('transform',function(d,i){    

    return 'translate('+(w/4-20)+','+25+')rotate(10)'
})

    myText.transition()
        .duration(tranSpeed*2)
        .textTween(() => t => `Time = ${t.toFixed(6)}`)
      .end();
  // }
// var line = svg.append("line")
//     .attr("x1", w/4)
//     .attr("y1", h/2)
//     .attr("x2", w*3/4)
//     .attr("y2", h/2)
//     .attr("stroke","white");
// var dt = new Date();
// var text = svg.append("text")
//     .attr("x", w/2)
//     .attr("y", h/2)
//     .attr("fill","white")
//     .text(dt.getMilliseconds())