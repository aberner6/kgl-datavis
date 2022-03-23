var w = 1500;
var h = 1500;

var treeData = [
    {
      "year": 1085,
      "sgi": 1193,
      "d13c": -20.04,
      "prec": 4.9,
      "r1": 10
    },
    {
      "year": 1086,
      "sgi": 1333,
      "d13c": -19.89,
      "prec": 4.47,
      "r1":0
    },
    {
      "year": 1087,
      "sgi": 0,
      "d13c": -20.04,
      "prec": 4.9,
      "r1": 0
    }
]


var svg = d3.select("svg")
			.attr("width",w)
			.attr("height",h)
			.style("background-color","pink");


var min = d3.min(treeData, d => d.sgi)
var max = d3.max(treeData, d => d.sgi)

var r2Scale = d3.scaleLinear()
            .domain([min,max])
            .range([0,3]);

for (var i = 0; i < treeData.length; i++) {
    if (treeData[i].r1==10){
        var rad2 = treeData[i].r1+r2Scale(treeData[i].sgi)
        console.log(rad2)
        var index = i;
        treeData[index].r2=rad2;
    }else{}
}

// var arcGenerator = d3.arc()

// arcGenerator
//     .startAngle(0)
//     .endAngle(0.5*Math.PI)
//     // .innerRadius(function (d,i){
//     //     return d.r1
//     // })
//     // .outerRadius(function (d,i){
//     //     return d.r2
//     // })
