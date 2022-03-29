var r = 250,
    w = r * 3,
    h = w,
    rad = Math.PI/180;
var width = 2000;
var height = 1200;
var xPad = width/3;
var yPad = height/4;

var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
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
var yScale = d3.scaleLinear().domain([1, 12]).range([h/4, 50]);



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
                "y":((h/2-r) * Math.sin((rotScale(month)) * rad)),
                "m":month
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
            .attr('class', function (d) {
                return d[0];
            })
            .attr('transform', function (d, i) {
                //this determines the circular positioning of each element
                return 'translate('+(xPad/2 + rotPos[i].x)+','+(yPad + rotPos[i].y)+')'
            });
        var pathShape = g.append('path')
            .attr('d',function(d,i){
                var lineData = (lineMaker(d[1]));
                return lineData
            })
            .attr('stroke', function(d) { 
                return 'white'
            })
            .attr('fill', "none")
            .attr('transform','rotate(90,'+w/2+','+h/2+')')
            .transition()
            .duration(3000)
            .attr('transform',function(d,i){
                return 'rotate('+rotScale(rotPos[i].m)+','+w/2+','+h/2+')'
            })
    }
}





