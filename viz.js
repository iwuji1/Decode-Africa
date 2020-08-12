//set the dimensions and margins of the graph

let features = ['mines','aluminum_mine','asbestos_mine','bariumbarite_mine','beryllium_mine','chromium_mine','copper_mine','diamond_mine','gold_mine','iron_mine','lead_mine','manganese_mine','nickel_mine','phosphorusphosphates_mine','platinum_mine','ree_mine','silver_mine','tin_mine','tungsten_mine']
var margin = {top: 100, right: 0, bottom: 0, left: 0},
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

//append the svg object

var svg= d3.select("#my_dataviz")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)

let radialScale = d3.scaleLinear()
	.domain([0,700])
	.range([0,250])

let ticks = [50,100,200,300,400,500,600,700]

ticks.forEach(t =>
	svg.append("circle")
		.attr("cx", width/2)
		.attr("cy", height/2)
		.attr("fill", "none")
		.attr("stroke", "gray")
		.attr("r", radialScale(t))
);

// ticks.forEach(t =>
//     svg.append("text")
//     .attr("x", width/2 - 8)
//     .attr("y", height/2 - radialScale(t))
//     .text(t.toString())
// );

function angleToCoordinate(angle, value){
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return {"x": width/2 + x, "y": height/2 - y};
}

function getPathCoordinates(data_point){
    let coordinates = [];
    for (var i = 0; i < features.length; i++){
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
}

for (var i = 0; i < features.length; i++) {
    let ft_name = features[i];
    let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
    let line_coordinate = angleToCoordinate(angle, 700);
    let label_coordinate = angleToCoordinate(angle, 700.5);

    //draw axis line
    svg.append("line")
    .attr("x1", width/2)
    .attr("y1", height/2)
    .attr("x2", line_coordinate.x)
    .attr("y2", line_coordinate.y)
    .attr("stroke","black");

    //draw axis label
    svg.append("text")
    .attr("x", label_coordinate.x)
    .attr("y", label_coordinate.y)
    .text(ft_name);
}

//Now, we will draw the shapes for the actual data. We will first define a helper function to 
//generate the coordinates for the vertices of each shape

let line = d3.line()
	.x(d => d.x)
	.y(d => d.y);
//We will also write a helper function that iterates through the fields in each data point in order 
//and use the field name and value to calculate the coordinate for that attribute. 
//The coordinates are pushed into an array and returned.



d3.csv("sorted_mines_no_names.csv").then(function(data) {
	let radialScale = d3.scaleLinear()
		.domain([0,700])
		.range([0,250])
	console.log(data)
	for (var i = 0; i < data.length; i ++){
	    let d = data[i];
	    // let color = colors[i];
	    let coordinates = getPathCoordinates(d);
	    console.log(coordinates)
	    //draw the path element
	    svg.append("path")
	    	.datum(coordinates)
	    	.attr("d",line)
	    	.attr("stroke-width", 3)
	    	.attr("stroke", "black")
	    	// .attr("fill", color)
	    	.attr("stroke-opacity", 1)
	    	.attr("opacity", 0.5);
}
})

// d3.csv("sorted_mines.csv").then(function(data) {
// 	console.log(data)
// 	var toRemove = ['Region','countryname'];
// 	var nestdata = d3.nest()
// 		.key(function(d) {return d.countryname})
// 		.entries(data);

// 	console.log(nestdata)
// 	//X scale
// 	var xscale = d3.scaleBand()
// 		.range([0,2*Math.PI])   // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
// 		.align(0)  //this does nothing
// 		.domain(data.Map(function(d) {return d.countryname;}) ); // The domain of the X axis is the list of countries

// 	//Y scale
// 	var yscale = d3.scaleRadial()
// 		.range([innerRadius,outerRadius]) //Domain will be defined later
// })
