


/*
* Scatter.js
* Script for a scatterplot.
*
* Name: Felicia van Gastel
* Studentnr: 11096187
*
* Data Processing week 4
* 4 april 2018
*/

// set up margin
var margin = {top: 20, right: 150, bottom: 30, left: 80},
width = 1000 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// create svg
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

// scale x axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// scale y axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// create lists for years 2000 and 2014
var data2000 = [];
var data2014 = [];
var data = data2000;

window.onload = function() {

  // requesting 4 different datasets instead of 1, so I can manage the data better
  var lifeExp2000 = "http://stats.oecd.org/SDMX-JSON/data/RWB/FIN+FRA+GRC+HUN+ITA+NLD+PRT+ESP+SWE+GBR.LIFE_EXP.VALUE/all?startTime=2000&endTime=2000"
  var lifeExp2014 = "http://stats.oecd.org/SDMX-JSON/data/RWB/FIN+FRA+GRC+HUN+ITA+NLD+PRT+ESP+SWE+GBR.LIFE_EXP.VALUE/all?startTime=2014&endTime=2014"
  var income2000 = "http://stats.oecd.org/SDMX-JSON/data/RWB/FIN+FRA+GRC+HUN+ITA+NLD+PRT+ESP+SWE+GBR.INCOME_DISP.VALUE/all?startTime=2000&endTime=2000"
  var income2014 = "http://stats.oecd.org/SDMX-JSON/data/RWB/FIN+FRA+GRC+HUN+ITA+NLD+PRT+ESP+SWE+GBR.INCOME_DISP.VALUE/all?startTime=2014&endTime=2014"

  // link for requesting the same data in 1 dataset:
  //http://stats.oecd.org/SDMX-JSON/data/RWB/BEL+DNK+FIN+FRA+DEU+GRC+HUN+IRL+ITA+NLD+NOR+PRT+ESP+SWE+GBR.INCOME_DISP+LIFE_EXP.VALUE/all?startTime=2000&endTime=2014

  var q = d3.queue()
      .defer(d3.request, lifeExp2000)
      .defer(d3.request, lifeExp2014)
      .defer(d3.request, income2000)
      .defer(d3.request, income2014)
      .awaitAll(function(error, data){getData(error, data)});

  var countriesAmount = 10;

  function getData(error, response) {
      if (error) throw error;

      // Use response to receive data from webserver in json format
      var lifeExp2000Data = JSON.parse(response[0].responseText)
      var lifeExp2014Data = JSON.parse(response[1].responseText)
      var income2000Data = JSON.parse(response[2].responseText)
      var income2014Data = JSON.parse(response[3].responseText)

      // Organise the JSON objects
      for (let i = 0; i < countriesAmount; i++){

          index = i + ":0:0"; // index for life expectancy in 2000

          // Create object in which a single country's info will be stored for the year 2000
          object2000 = {
              "country": income2000Data.structure.dimensions.series[0].values[i]["name"],
              "income": income2000Data.dataSets[0].series[index].observations[0][0],
              "lifeExp": lifeExp2000Data.dataSets[0].series[index].observations[0][0]
          };

          // Push city object to data dictionary
          data2000.push(object2000);

          // Create object in which a single country's info will be stored for the year 2014
          object2014 = {
              "country": income2000Data.structure.dimensions.series[0].values[i]["name"],
              "income": income2014Data.dataSets[0].series[index].observations[0][0],
              "lifeExp": lifeExp2014Data.dataSets[0].series[index].observations[0][0]
          };

          // Push city object to data dictionary
          data2014.push(object2014);

      };

      // call function to make the scatterplot
      makeScatter(data);
      };
};

// update chart
d3.selectAll(".year")
  .on("click", function(){

    // get data for selected year
    var value = this.getAttribute("value");

    if (value == "2000"){
        data = data2000
    };
    if (value == "2014"){
        data = data2014
    };
    updateChart(data);
});


function makeScatter(data){

    // set x and y domain
    x.domain(d3.extent(data, function(d) { return d.income; })).nice();
    y.domain(d3.extent(data, function(d) { return d.lifeExp; })).nice();

    // create x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Income per capita (US Dollar)");

    // create y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y",- 60)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Life expectancy at birth (Years)")

    // create the dots
    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 8)
        .attr("cx", function(d) { return x(d.income); })
        .attr("cy", function(d) { return y(d.lifeExp); })
        .style("fill", function(d) { return color(d.country); })

    addLegend(data);
};

function addLegend(data){

    var legend = svg.selectAll(".legend")
        .data(color.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    legend.append("text")
      .attr("x", width + 25)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d) { return d; });
};

function updateChart(data){

  // update x axis
  var x = d3.scale.linear()
      .range([0, width]);
  x.domain(d3.extent(data, function(d) { return d.income; })).nice();

  // update y axis
  var y = d3.scale.linear()
      .range([height, 0]);
  y.domain(d3.extent(data, function(d) { return d.lifeExp; })).nice();

  // update scatterplot
  svg.selectAll("circle")
    .data(data)
    .transition()
    .duration(1000)
    .attr("cx", function(d) { return x(d.income); })
    .attr("cy", function(d) { return y(d.lifeExp); })
    .attr("r", 8)
    .style("fill", function(d) { return color(d.country); })

  // update x axis
  svg.select("axis")
      .transition()
      .duration(1000)
      .call(xAxis)

  // update y axis
  svg.select("axis")
      .transition()
      .duration(100)
      .call(yAxis)
};
