// var w = 2000;
// var h = 1000;
var r = 250,
    w = r * 3,
    h = w,
    rad = Math.PI/180;

var svg = d3.select("svg")
    .attr("width", 2000)
    .attr("height", 1000)
    .style("background-color","black")

var dataset = [];
d3.json("dataset.json").then(function (data) {
    dataset = data;
    doAll();
});

var arrData = []
var nested = []
var dates = []
var rotPos = []
var g;

var rotScale = d3.scaleLinear()
    .domain([0, 12])
    .range([0, 360]);
var lineMaker = d3.line().curve(d3.curveCardinal);
var xScale = d3.scaleLinear().domain([0, 24]).range([50, w-50]);
var yScale = d3.scaleLinear().domain([1, 12]).range([h/2, 50]);



function doAll() {
    processData();
    function processData(){
        for (var i = 0; i < dataset.length; i++) {
            dates.push(dataset[i].date)
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
        processMonth();
    }
    function processMonth(){
        for (var i = 0; i< dates.length; i++){
            var month = parseInt(dates[i].slice(3,5));

            rotPos.push({
                "x":((w/2-r) * Math.cos((rotScale(month)) * rad)),
                "y":((h/2-r) * Math.sin((rotScale(month)) * rad))
            })
        }
        draw();
    }
    function draw(){
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
            .attr('class', function(d){
                return d[0];
            })
            .attr('transform',function(d,i){
                console.log(d);
                console.log(i);
                // return 'translate(10, 10)rotate(10)'
                return 'translate('+(500+rotPos[i].x)+','+(300+rotPos[i].y)+')rotate('+45+')'
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
    }
}