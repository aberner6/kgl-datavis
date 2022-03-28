var w = 2500;
var h = 1000;
var glowStrength = 7
var r = 40
var leftMargin = r*2
var svg = d3.select("body").append("svg")
      .attr("width",w)
      .attr("height",h)
document.body.style.backgroundImage = "url('galaxy4.jpg')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";

var spaceGroup = svg.append("g")
    .attr("class","spaceGroup")
    .attr("transform",'rotate(0)')
    .style("background-color","white")


var defs = spaceGroup
    .append("defs");
var mask = spaceGroup
    .append("mask")
    .attr("id", "myMask");
 //Filter for the outside glow
var filter = spaceGroup.append("filter")
     .attr("id","blur");
filter.append("feGaussianBlur")
     .attr("stdDeviation",glowStrength)
     .attr("result","coloredBlur");

// var milkyBlur = spaceGroup.append("circle")
//     .attr("cx", leftMargin)
//     .attr("cy", h/2)
//     .attr("fill","white")
//     .attr("r", r)
//     .transition()
//     .duration(35700) //3.57 seconds
//     .attr("cx", w/2)
//     .style("filter", "url(#blur)");
// var androBlur = spaceGroup.append("circle")
//     .attr("cx", w - leftMargin)
//     .attr("cy", h/2)
//     .attr("fill","pink")
//     .attr("r", r)
//     .transition()
//     .duration(35700) //3.57 seconds
//     .attr("cx", w/2)
//     .style("filter", "url(#blur)")
var milky = spaceGroup.append("circle")
    .attr("cx", leftMargin)
    .attr("cy", h/2)
    .attr("fill","black")
    .attr("r", 10)
    .transition()
    .duration(35700) //3.57 seconds
    .attr("cx", w/2)

var andro = spaceGroup.append("circle")
    .attr("cx", w - leftMargin)
    .attr("cy", h/2)
    .attr("fill","black")
    .attr("r", 10)
    .transition()
    .duration(35700) //3.57 seconds
    .attr("cx", w/2)
    .attr('transform','rotate(90)');







var xScale = d3.scaleLinear()
    .domain([0, 26000000])
    .range([leftMargin, w - leftMargin]);
var x_axis = d3.axisBottom()
        .scale(xScale);
var axisLoc = h-100;
svg.append("g")
    .attr("transform", "translate(0, " + axisLoc  +")")
    .call(x_axis)
    .style("text-anchor", "end")
    .style("font-size", 25)
    .style("color","white")
    .style("fill", "#white")
    .style("sroke-width", 5);
var tranSpeed = 8000;
var myText = svg.append("text")
    .attr("x", 1900)
    .attr("y",270)
    .style("fill","white")
    .style("font-family", "var(--sans-serif)")
    .style("font-variant-numeric", "tabular-nums")
    .style("font-size", 40);
myText.transition()
    .duration(35700)
    .textTween(() => t => `Years = ${t.toFixed(6)*4500000000}`)
    .end();