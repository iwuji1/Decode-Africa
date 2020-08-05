//set the dimensions and margins of the graph
var margin = {top: 100, right: 0, bottom: 0, left: 0},
    width = 460 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

//append the svg object

var svg= d3.select("#my_dataviz")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append('g')
		.attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

d3.csv("sorted_mines.csv").then(function(data) {
	console.log(data)
	var toRemove = ['Region','countryname'];
	var nestdata = d3.nest()
		.key(function(d) {return d.countryname})
		.entries(data);

	console.log(nestdata)
	//X scale
	var xscale = d3.scaleBand()
		.range([0,2*Math.PI])   // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
		.align(0)  //this does nothing
		.domain(data.Map(function(d) {return d.countryname;}) ); // The domain of the X axis is the list of countries

	//Y scale
	var yscale = d3.scaleRadial()
		.range([innerRadius,outerRadius]) //Domain will be defined later
})
