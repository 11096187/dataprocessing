/*
* script.js
*
* script for a barchart
*
* Name: Felicia van Gastel
* Studentnr: 11096187
*/

// set the right sizes round chart
var margin = {top: 40, right: 40, bottom: 60, left: 80},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// Set ranges for x and y
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .05)
    .domain(years);

var y = d3.scale.linear()
    .range([height, 0])
    .domain([0, d3.max(population)]);

// create the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// initialize tip to create interactivity
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>Population:</strong>" + d.population;
  });

// create variable for the SVG
var svg = d3.select("body").append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Call tip
svg.call(tip);


// Create arrays to store data
var years = [];
var population = [];


// import JSON data file and use data to make bar chart
d3.json("data.json", function(data) {

    // Send JSON values into separate arrays
    for (var i = 0, i < data.length; i++) {
        years.push(data[i].year);
        population.push(Number(data[i].population));
    }

    console.log(data);

    // create x axis and labels
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .style("text-anchor", "end")
        .attr("class", "year")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform, rotate(-90)");
        .text("Years");

    // create y axis and labels
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Population");

    // draw the bars
    svg.selectAll(".bar")
        .data(data)
    .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.years); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.population); })
        .attr("height", function(d) { return height - y(d.population); })
        .on('mouseover', tip.show) // interactivity of the bars
        .on('mouseout', tip.hide);
});