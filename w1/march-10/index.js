var w = 500;
var h = 500;
var rad = 20;


var svg = d3.select("svg")
			.attr("width",w)
			.attr("height",h);

var arrData = [10, 40, 80];

d3.select('svg')
  .selectAll('circle')
  .data(arrData)
  .join('circle')
	.attr('cx', function(d,i){
		return 50+i*50;
	})
  .attr('cy', h/2)
  .attr('r', function(d){
		return d/2;
	})
  .style('fill', 'pink')
  .attr('stroke','magenta')
  .attr('opacity',.3)