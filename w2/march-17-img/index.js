var w = 1000;
var h = 500;
var rad = 20;
var leftMargin = rad*2;
var imgW = rad*4;
var imgH = rad*4;
var svg = d3.select("svg")
			.attr("width",w)
			.attr("height",h)
			.style("background-color","black")

var imgData = [
	{
	"day":4,
	"img":"img1.jpeg"
	},
	{
	"day":14,
	"img":"img2.jpeg"
	},
	{
	"day":24,
	"img":"img3.jpeg"
	}
];

var minDay = d3.min(imgData, function(d){
	return d.day;
})
var maxDay = d3.max(imgData, function(d){
	return d.day;
})
var dayScale = d3.scaleLinear()
	.domain([minDay, maxDay])
	.range([imgW, w-imgW*2])
d3.select('svg')
    .selectAll('image')
    .data(imgData)
    .join('image')
    .attr('x', function(d){
    	return dayScale(d.day);
    })
    .attr('y', h/2)
    .attr('width', imgW)
    .attr('height', imgH)
	.attr("xlink:href", function(d){
		return d.img;
	})


