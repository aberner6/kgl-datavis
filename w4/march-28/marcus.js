var canvasScale = 1000;
var x     = (canvasScale/2);
var y     = (canvasScale/2);
var t0    = new Date().setHours(0,0,0,0);
var delta = (Date.now() - t0);
var timeScale = 100;
var modelScale = 40;
var glowAmount = 0.2;


var systemData = [

    // Mercury
    {name: "Mercury",      distance: 0.4,    radius:     1,            color:  "#B78668",      speed:      -1.60,    phi0:    35,  moons: [] },
    // Venus
    {name: "Venus",        distance: 0.7,    radius:     2,            color:  "#F3B3B3",        speed:      -1.17,    phi0:    185,  moons: [] },
    // Earth
    {name: "Earth",        distance: 1,    radius:     2,            color:  "#5EC0E3",      speed:      -1.00,    phi0:    135,    moons: [
        // Earth's moons
    {name: "The Moon",     distance: 0.09,    radius:     0.5,          color: "#CFD4D7",       speed:      -9.00,    phi0:  15 } // Earths moon
    ]},
    // Mars
    {name: "Mars",         distance: 1.5,   radius:     2,            color:  "#D83B2A",        speed:      -0.80,    phi0:    235,    moons:[
        // Mars moons
    {name: "Phobos",       distance: 0.05,     radius:     0.2,          color: "#C1CFD2",       speed: -3.80,          phi0:  15 },
    {name: "Deimos",       distance: 0.12,     radius:     1.5,          color: "#C1CFD2",       speed: -2.80,          phi0:  115 }
    ]},
    // Jupiter
    {name: "Jupiter",      distance: 5.2,   radius:     14,           color:  "#D39272",        speed:      -0.43,   phi0:    135,    moons: [
        // Jupiters moons
    {name: "Io",           distance: 0.421,    radius:     1.5,          color: "#A37F3C",       speed: -7.70,          phi0:  25 },
    {name: "Europa",       distance: 0.67,    radius:     0.4,          color: "#A39477",       speed: -2.45,          phi0:  95 },
    {name: "Ganymede",     distance: 1.07,    radius:     1.7,          color: "#706553",       speed: -1.10,          phi0:  125 },
    {name: "Callisto",     distance: 1.88,    radius:     0.3,          color: "#4B5154",       speed: -0.50,          phi0:  315 }
    ]},
    // Saturn
    {name: "Saturn",       distance: 9.5,   radius:     11,           color:  "#FFE577",        speed:      -0.43,   phi0:    260,    moons: [
        // Saturn's moons
    {name: "Mimas",        distance: 0.65,    radius:     0.4,          color: "#C1CFD2",       speed: -4.10,          phi0:  120 },
    {name: "Enceladus",    distance: 0.86,    radius:     0.6,          color: "#BCAE53",       speed: -3.90,          phi0:  20 },
    {name: "Tethys",       distance: 0.98,    radius:     1,          color: "#A85F43",       speed: -3.60,          phi0:  0 },
    {name: "Dione",        distance: 1.42,    radius:     1.1,          color: "#767A7F",       speed: -3.20,          phi0:  100 },
    {name: "Rhea",         distance: 2.0,    radius:     2,          color: "#7C746D",       speed: -2.90,          phi0:  300 },
    {name: "Titan",        distance: 2.3,    radius:     5,          color: "#D8AD41",       speed: -1.30,          phi0:  180 },
    {name: "Iapetus",      distance: 2.7,   radius:     2,          color: "#757A7F",       speed: -0.10,          phi0:  10 }
    ]},
    // Uranus
    {name:  "Uranus",      distance: 19.8,   radius:     0.8,       color:  "#CEFDFF",    speed:  -0.05,  phi0:    44,              moons: [
        //Uranus Moons
    {name: "Titania",      distance: 0.12,    radius:     0.1,       color:  "#BA926D",    speed:  -1.20,  phi0:    200},
    {name: "Ariel",        distance: 0.2,    radius:     0.15,      color:  "#C1CFD2",    speed:  -0.45,  phi0:    4},
    ]},
    {name:  "Neptune",      distance: 30.1,   radius:     5.6,       color:  "#2076C1",    speed:      -0.04,  phi0:    16,          moons: [
        //Neptune's Moons
    {name: "Proteus",      distance: 0.25,    radius:     0.8,       color:  "#C1CFD2",    speed:  -1.20,  phi0:    200}    
    ]},
    {name:  "Pluto",        distance: 32,   radius:     1.1,        color:  "white",    speed:      -0.06,  phi0:    153,            moons: [

    ]}, 
]


var svg = d3.select("svg")
    .attr("width", canvasScale)
    .attr("height", canvasScale)
    .style("background-color", "#000914");


var sliderScale = d3.select("#sliderScale").on("input", function() {
    update(+this.value);
});
// --------------glow setup-------------------------------------------------------

//Container for the gradients
var defs = svg.append("defs");

//Filter for the outside glow
var filter = defs.append("filter")
    .attr("id","glow");
filter.append("feGaussianBlur")
    .attr("stdDeviation",glowAmount)
    .attr("result","coloredBlur");
var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode")
    .attr("in","coloredBlur");
feMerge.append("feMergeNode")
    .attr("in","SourceGraphic");

// --------------------------------------------------------------------------




var orbitalRings;
var orbitalGradient;
var planet;
var moonCluster;
var moonOrbital, planetGradient, moonCircle;
    // planet group
var container = svg.append("g")
    .attr("id", "orbit_container")
    .attr("transform", "translate(" + x + "," + y + ")");

var sun = container.append("circle")
    .attr("r", modelScale/5)
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("fill", "#FFD644")
 //   .attr("stroke", "white")
    .attr("id", "sun");

container.selectAll("g.planet")
    .data(systemData)
    .enter()
    .append("g")
    .attr("class", "planet_cluster")
    .each(function(d, i) {

    // Create rings representing orbital cycle
    orbitalRings = d3.select(this)
        .append("circle")
        .attr("class", "orbit")
        .attr("r", d.distance*modelScale)
        .attr("fill", "none")
        .attr("stroke", "#5285AD")
        .attr("stroke-width", modelScale/14)
        .attr("stroke-opacity", 0.5)
        .style("stroke-dasharray", (Math.abs(d.speed)*2522, Math.abs(d.speed)*100))
        .style("filter", "url(#glow)");
    
    // Create gradient effect from sun outwards
    orbitalGradient = d3.select(this)
        .append("circle")
        .attr("class", "orbit")
        .attr("r", d.distance*modelScale)
        .attr("fill", "#5285AD")
        .attr("opacity", 0.008);


    // Create planets
    planet = d3.select(this)
        .append("circle")
        .attr("r", d.radius)
        .attr("cx",d.distance*modelScale)
        .attr("cy", 0)
        .attr("class", "planet1")
        .attr("fill", d.color)
        .attr("stroke", "white")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 0.6)
        .attr("id", d.name);
    

    moonCluster = d3.select(this)
        .append("g")
        .attr("transform", "translate(" + d.distance*modelScale + ",0)")
        .selectAll("g.moon")
        .data(d.moons)
        .enter()
        .append("g")
        .attr("class", "moon_cluster")
        .each(function(d, i) {

        //Moon orbital cycle representation
    moonOrbital = d3.select(this)
        .append("circle")
        .attr("class", "orbit")
        .attr("r", d.distance*modelScale)
        .attr("fill", "none")
        .attr("stroke", d.color)
        .attr("stroke-width", 0.3)
        .style("stroke-dasharray", ("10,5"))
        .style("filter", "url(#glow)");
    
        // Create gradient effect from planet outwards
    planetGradient = d3.select(this)
        .append("circle")
        .attr("class", "orbitGradient")
        .attr("r", d.distance*modelScale)
        .attr("fill", d.color)
        .attr("opacity", 0.02);

    moonCircle = d3.select(this)
        .append("circle")
        .attr("r", d.radius)
        .attr("cx",d.distance*modelScale)
        .attr("cy", 0)
        .attr("class", "moon")
        .attr("id", d.name)
        .attr("fill", d.color);

            })
            .attr("transform", function(d) {
            return "rotate(" + (d.phi0 + (delta * (d.speed/timeScale))) + ")";
            });
        })
        .attr("transform", function(d) {
        return "rotate(" + (d.phi0 + (delta * (d.speed/timeScale))) + ")";
        });

      // throttled rotaton animations
      setInterval(function(){
        var delta = (Date.now() - t0);
        svg.selectAll(".planet_cluster, .moon_cluster").attr("transform", function(d) {
          return "rotate(" + (d.phi0 + (delta * (d.speed/timeScale))) + ")";
        });
      }, 40);

var zoom = d3.zoom()
  .on('zoom', handleZoom)
  .scaleExtent([.1, 5])
  // .translateExtent([[0, 0], [canvasScale, canvasScale]]);

function handleZoom(e) {
  d3.select('#orbit_container')
    .attr('transform', e.transform);
}
initZoom(); 
function initZoom() {
  d3.selectAll('svg')
    .call(zoom);
  // d3.selectAll('svg')
  //   .transition()
  //   .duration(2000)
  //   .call(zoom.scaleBy, 2)
  //   .transition()
  //   .duration(3000)
  //   .call(zoom.translateBy,0, h/2);
}
function update(val){
    var modelScale = val;
    sun
        .transition()
        .attr("r", modelScale/5)

    orbitalRings
        .transition()
        .attr("r", function(d){ 
            return d.distance*modelScale;
        })
        .attr("stroke-width", modelScale/14);
    orbitalGradient
        .transition()
        .attr("r", function(d){
            return d.distance*modelScale
        })

    planet
        .transition()
        .attr("cx", function(d){
            console.log(d.distance*modelScale)
            return d.distance*modelScale
        })
    moonCluster
        .transition()
        .attr("transform", function(d){
            return "translate(" + d.distance*modelScale + ",0)"
        })
    moonOrbital
        .transition()
        .attr("r", function(d){
            console.log(d);
            return d.distance*modelScale
        })
    planetGradient
        .transition()
        .attr("r", function(d){
            return d.distance*modelScale
        })
    moonCircle
        .transition()
        .attr("cx",function(d){
            return d.distance*modelScale
        })
}