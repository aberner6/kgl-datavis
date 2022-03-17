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


var skyData = [];
d3.json("sky.json").then(function(data) {
     skyData = data;
     draw();
});

var lineMaker = d3.line();

function draw(){
  var xScale = d3.scaleLinear().domain([0, skyData.length]).range([0, w]);
  var yScale = d3.scaleLinear().domain([0, 100]).range([h, 0]);

  lineMaker
    .x(function(d, i) {
      return xScale(i);
    })
    .y(function(d) {
      return yScale(d.sky);
    });


  var lineData = lineMaker(skyData);

  svg
    .append('path')
    .attr('d', lineData)
    .attr('stroke','white')
}





// var minDay = d3.min(imgData, function(d){
//  return d.day;
// })
// var maxDay = d3.max(imgData, function(d){
//  return d.day;
// })
// var dayScale = d3.scaleLinear()
//  .domain([minDay, maxDay])
//  .range([imgW, w-imgW*2])




// var data = [];

// svg.on("click", function(){
//  updateData();
//  updateVis();
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

