var w = 500;
var h = 500;
var rad = 20;
var leftMargin = rad;


var svg = d3.select("svg")
			.attr("width",w)
			.attr("height",h)
			.style("background-color","black")

var arrData = [1, 10, 17, 28];

var min = d3.min(arrData);
var max = d3.max(arrData);

var xScale = d3.scaleLinear()
				.domain([min, max])
				.range([leftMargin*2, w-leftMargin*2]);

var rotationScale = d3.scaleLinear()
				.domain([min, max])
				.range([0, 360]);

var gElements = svg.selectAll('g')
	.data(arrData)
	.join('g')
    .attr('transform' , function(d){
    	return 'translate('+xScale(d)+',' +h/2+')'
    });


	gElements.append('circle')
		.attr('cx',0)
		.attr('cy',0)
		.attr('r',function(d){
			return d;
		})
		.attr('fill',function(d){
			return 'rgb('+d+',100,100)';
		})
		.attr('opacity',.7);
	gElements.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', rad)
		.attr('height', rad)
		.attr('fill', 'none')
		.attr('stroke','magenta')
		.attr('transform',function(d,i){
			return 'rotate('+rotationScale(d)+')'
		});

// var rects = svg
// 	.selectAll('rect')
// 	.data(arrData)
// 	.join('rect')
// 	.attr('x', 0)
// 	.attr('y', 0)
// 	.attr('width', rad)
// 	.attr('height', rad)
// 	.attr('fill', 'none')
// 	.attr('stroke','magenta')
//     .attr('transform' , function(d){
//     	return 'translate('+xScale(d)+',' +h/2+') rotate(15)'
//     })




















// var fruitQuant = [];
// d3.json("fruitQuant.json")
// 	.then(function(data) {
//     	fruitQuant = data;
//     	draw();
//   	});

// function draw(){
// 	////new need here:
// 	var min = d3.min(fruitQuant, function(d){
// 		return d.quant;
// 	});
// 	var max = d3.max(fruitQuant, function(d){
// 		return d.quant;
// 	});

// 	////new need here:
// 	var fruitNames = [];
// 	var fruitColors = [];

// 	getFruit();
// 	function getFruit(){
// 		for (var i = 0; i<fruitQuant.length; i++){
// 			fruitNames.push(fruitQuant[i].fruit);
// 			fruitColors.push(fruitQuant[i].color);
// 		}
// 	}

// 	var ordinalScale = d3.scaleOrdinal()
// 						  .domain(fruitNames)
// 						  .range(fruitColors);

// 	var xScale = d3.scaleLinear()
// 					.domain([min, max])
// 					.range([leftMargin, w-leftMargin]);

// 	var fruitRects = svg
// 		.selectAll('rect')
// 		.data(fruitQuant)
// 		.join('rect')
// 		.attr('x', function(d,i){
// 			return xScale(d.quant);
// 		})
// 		.attr('y', h/2)
// 		.attr('width', rad)
// 		.attr('height', rad)
// 		.attr('opacity',.5)
// 		.attr('fill', function(d){
// 			return ordinalScale(d.fruit);
// 		})
// }
