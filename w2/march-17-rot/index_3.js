
var w = 1000;
var h = 500;


var innerCircleRadius = 100;
var outerCircleRadius = 120;
var originX = 200;
var originY = 200;
var leftMargin = innerCircleRadius;
var rad = innerCircleRadius/8;
var num = outerCircleRadius;

var skyData = [
	{"day":1, "cloud":0},
	{"day":2, "cloud":70},
	{"day":3, "cloud":10},
	{"day":4, "cloud":0},
	{"day":5, "cloud":20},
	{"day":6, "cloud":0},
	{"day":7, "cloud":30},
	{"day":8, "cloud":60},
	{"day":9, "cloud":80},
	{"day":10, "cloud":100}
]
console.log(skyData[0]);

var svg = d3.select("svg")
			.attr("width",w)
			.attr("height",h)
			.style("background-color","black")
svg.append("circle")
	.attr("cx", originX)
	.attr("cy", originY)
	.attr("r", innerCircleRadius)
	.attr("fill","none")
	.attr("stroke","white");

var minSky = d3.min(skyData, function(d){
	return d.cloud;
});
var maxSky = d3.max(skyData, function(d){
	return d.cloud;
});

var rotScale = d3.scaleLinear()
	.domain([minSky, maxSky])
	.range([0, 350])

var gElements = svg.selectAll("g")
	.data(skyData)
	.join("g")
	.attr("transform", function(d,i){
		return "translate("+(originX+(num*Math.sin(rotScale(i))))+","+(originY-(num*Math.cos(rotScale(i))))+")"
	})

gElements
	.append("rect")
	.attr("x", 0)
	.attr("y",0)
	.attr("width",rad)
	.attr("height",rad)
	.attr("fill","white")
	.attr("transform", function(d,i){
		return "rotate("+rotScale(d.cloud)+")"
	})
gElements
	.append("circle")
	.attr("cx", 0)
	.attr("cy",0)
	.attr("r",rad)
	.attr("stroke","white")
	.attr("fill","none")

