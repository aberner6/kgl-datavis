var points = [
  [480, 200],
  [580, 400],
  [680, 100],
  [780, 300],
  [180, 300],
  [280, 100],
  [380, 400]
];

var svg = d3.select("body").append("svg")
    .attr("width", 960)
    .attr("height", 500);

var line = d3.line()
    .curve(d3.curveCardinal);

//THIS IS THE PATH
var path = svg.append("path")
    .data([points])
    .attr("d", line)
    .attr("fill","none")
    .attr("stroke","black")
//THESE ARE THE POINTS THAT DEFINE THE PATH
svg.selectAll(".point")
    .data(points)
  .enter().append("circle")
    .attr("r", 4)
    .attr("fill","black")
    .attr("transform", function(d) { return "translate(" + d + ")"; });

var circle = svg.append("circle")
    .attr("r", 13)
    .attr("transform", "translate(" + points[0] + ")");

transition();

function transition() {
  circle.transition()
      .duration(10000)
      .attrTween("transform", translateAlong(path.node()))
      // .each("end", transition);
}

// Returns an attrTween for translating along the specified path element.
function translateAlong(path) {
  var l = path.getTotalLength();
  return function(d, i, a) {
    return function(t) {
      var p = path.getPointAtLength(t * l);
      return "translate(" + p.x + "," + p.y + ")";
    };
  };
}