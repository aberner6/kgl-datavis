var w = 500;
var h = 500;
var rad = 20;


var svg = d3.select("svg")
			.attr("width",w)
			.attr("height",h);

var arrData = [10, 40, 80];

//hint on drawing shapes
// d3.select('svg')
//   .append('circle')
//   .attr('cx',w/2)
//   .attr('cy', h/2)
//   .attr('r', rad)
//   .attr('fill','none')
// 	.attr('stroke','magenta')

// d3.select('svg')
//   .append('rect')
//   .attr('x',w/2)
//   .attr('y', h/2)
//   .attr('width', rad)
//   .attr('height', rad)
//   .attr('fill','none')
// 	.attr('stroke','magenta')



//hint on color
// d3.select('svg')
//   .selectAll('circle')
//   .data(arrData)
//   .join('circle')
// 	.attr('cx', function(d,i){
// 		return 50+i*50;
// 	})
//   .attr('cy', h/2)
//   .attr('r', function(d){
// 		return d/2;
// 	})
//  	.attr('fill', function(d){
// 			return 'rgb('+d*2+',10, 200)'
// 	})
// 	.attr('stroke','magenta')
//   .attr('opacity',.5)