var w = 500;
var h = 500;
var rad = 20;

var sky1 = "blue";
var sky2 = "grey";
var sky3 = "pink";

var svg = d3.select("#canvas")
						.append("svg")
						.attr("width",w)
						.attr("height",h);

var circL = svg.append("circle")
						.attr("cx", w/4)
						.attr("cy", h/2)
						.attr("r", rad)
						.attr("fill",sky1);

var circC = svg.append("circle")
						.attr("cx", w/2)
						.attr("cy", h/2)
						.attr("r", rad)
						.attr("fill",sky2);

var circR = svg.append("circle")
						.attr("cx", w*3/4)
						.attr("cy", h/2)
						.attr("r", rad)
						.attr("fill",sky3);