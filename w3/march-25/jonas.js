var w = 2000;
var h = 1000;

var svg = d3.select("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color","black")

var dataset = [];
d3.json("dataset.json").then(function (data) {
    dataset = data;
    drawLine();
});

var lineMaker = d3.line().curve(d3.curveCardinal);

var xScale = d3.scaleLinear().domain([0, 24]).range([50, w-50]);
var yScale = d3.scaleLinear().domain([1, 12]).range([h/2, 50]);

var arrData = []
var nested = []
var g;
function drawLine() {
 
    for (var i = 0; i < dataset.length; i++) {
        for (var j = 0; j<dataset[i].time.length; j++){
            arrData.push({
                "x": dataset[i].time[j],
                "y": dataset[i].altitude[j],
                "date": dataset[i].date
            })
        }
    }

    nested = d3.group(arrData, function(d){
        return d.date;
    })

    lineMaker
        .x(function (d) {
            return xScale(d.x);
        })
        .y(function (d) {
            return yScale(d.y);
        });
    var lineData;
    g = svg.selectAll('g')
        .data(nested)
        .join('g')
        .attr('transform',function(d,i){
            var x = 100+i*100;
            return 'translate('+x+','+h/4+')'
        })

    var pathShape = g.append('path')
        .attr('d',function(d,i){
            var lineData = (lineMaker(d[1]));
            return lineData
        })
        .attr('stroke', function(d) { 
            return 'white'
        })
        .attr('fill', "none")

    // var circs = g.selectAll('circle')
    //     .data(function(d){
    //         return d[1];
    //     })
    //     .join('circle')
    //     .attr('cx',0)
    //     .attr('cy',0)
    //     .attr('r',function(d){
    //         return d.y;
    //     })
    //     .attr('stroke','white')
}