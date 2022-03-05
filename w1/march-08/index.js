var w = 500;
var h = 500;
var rad = 20;

var svg = d3.select("svg")
			.attr("width",w)
			.attr("height",h);

var circles = d3.selectAll("circle")
				.attr("r", rad)
				.attr("cx", w/2)
				.attr("cy", h/2);