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






// var data = [];

// svg.on("click", function(){
// 	updateData();
// 	updateVis();
// })

// function updateData() {
//   data = []; //empty the data
//   for(var i=0; i<5; i++) {
//     data.push(Math.random()*w);
//   }
// }
// function updateVis() {
//   d3.select('svg')
//     .selectAll('circle')
//     .data(data)
//     .join('circle')
//     .attr('cy', h/2)
//     .attr('r', rad)
//     .attr('fill','white')
//     .transition()
//     .duration(4000)
//     .attr('cx', function(d) {
//       return d;
//     });
// }





// var wholeData = [0,3,5,10,13,15,20,23,25];
// var partData = [];
// var index = 0;

// svg.on("click", function(){
// 	updateData();
// })
// var index = 0;
// var inc = 3;
// function updateData() {
// 	partData = []; //empty the data
// 	for(var i=index; i<index+inc; i++) {
// 		partData.push(wholeData[i]);
// 	}
// 	console.log(partData)
// 	index = index+inc;
// 	updateVis();
// }
// function updateVis() {
  // d3.select('svg')
  //   .selectAll('circle')
  //   .data(partData)
  //   .join('circle')
  //   .attr('cy', h/2)
  //   .attr('r', rad)
  //   .attr('fill','white')
  //   .transition()
  //   .duration(4000)
  //   .attr('cx', function(d) {
  //     return d*10;
  //   });
// }




// var imgData = [
// 	{
// 	"day":4,
// 	"img":"img1.jpeg"
// 	},
// 	{
// 	"day":14,
// 	"img":"img2.jpeg"
// 	},
// 	{
// 	"day":24,
// 	"img":"img3.jpeg"
// 	}
// ];

// var minDay = d3.min(imgData, function(d){
// 	return d.day;
// })
// var maxDay = d3.max(imgData, function(d){
// 	return d.day;
// })
// var dayScale = d3.scaleLinear()
// 	.domain([minDay, maxDay])
// 	.range([imgW, w-imgW*2])
// d3.select('svg')
//     .selectAll('image')
//     .data(imgData)
//     .join('image')
//     .attr('x', function(d){
//     	return dayScale(d.day);
//     })
//     .attr('y', h/2)
//     .attr('width', imgW)
//     .attr('height', imgH)
// 	.attr("xlink:href", function(d){
// 		return d.img;
// 	})
// 	.transition()
// 	.duration(3000)
// 	.attr("y", 0)
// 	.transition()
// 	.duration(3000)
// 	.attr("x",w/2)
// 	.attr("y",h/2)
// 	.attr("opacity",.5)



