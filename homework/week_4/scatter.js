


/*
* Scatter.js
* Contains script for scatterplot.
*
* Name: Felicia van Gastel
* Studentnr: 11096187
*
* Data Processing week 4
* 4 april 2018
*/

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

  var data2000 = [];
  var data2014 = [];

  var countriesAmount = 10;

  function getData(error, response) {
      if (error) throw error;

      // Use response to receive data from webserver in json format
      var lifeExp2000Data = JSON.parse(response[0].responseText)
      var lifeExp2014Data = JSON.parse(response[1].responseText)
      var income2000Data = JSON.parse(response[2].responseText)
      var income2014Data = JSON.parse(response[3].responseText)

      console.log(lifeExp2000Data)
      console.log(lifeExp2014Data)
      console.log(income2000Data)
      console.log(income2014Data)

      // Organise the JSON objects
      for (let i = 0; i < countriesAmount; i++){

          index = i + ":0:0"; // index for life expectancy in 2000

          // Create object in which a single country's info will be stored for the year 2000
          object2000 = {
              "name": income2000Data.structure.dimensions.series[0].values[i]["name"],
              "income": income2000Data.dataSets[0].series[index].observations[0][0],
              "lifeExp": lifeExp2000Data.dataSets[0].series[index].observations[0][0]
          };

          // Push city object to data dictionary
          data2000.push(object2000);

          // Create object in which a single country's info will be stored for the year 2014
          object2014 = {
              "name": income2000Data.structure.dimensions.series[0].values[i]["name"],
              "income": income2014Data.dataSets[0].series[index].observations[0][0],
              "lifeExp": lifeExp2014Data.dataSets[0].series[index].observations[0][0]
          };

          // Push city object to data dictionary
          data2014.push(object2014);

        };

      console.log(data2000, data2014);

      // makeScatter(data);
      // addLegend(data);
  };
//
};
//
// function makeScatter(data){
//
//     var margin = {top: 20, right: 20, bottom: 30, left: 80},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;
//
//     // create svg
//     var svg = d3.select("body").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//     var x = d3.scale.linear()
//         .range([0, width]);
//
//     var y = d3.scale.linear()
//         .range([height, 0]);
//
//     var color = d3.scale.category10();
//
//     // scale x axis
//     var xAxis = d3.svg.axis()
//         .scale(x)
//         .orient("bottom");
//
//     // scale y axis
//     var yAxis = d3.svg.axis()
//         .scale(y)
//         .orient("left");
//
//     x.domain(d3.extent(data, function(d) { return d.womenData; })).nice();
//     y.domain(d3.extent(data, function(d) { return d.consconfData; })).nice();
//
//     // create x axis
//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis)
//       .append("text")
//         .attr("class", "label")
//         .attr("x", width)
//         .attr("y", -6)
//         .style("text-anchor", "end")
//         .text("Women in science");
//
//     // create y axis
//     svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis)
//       .append("text")
//         .attr("class", "label")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", ".71em")
//         .style("text-anchor", "end")
//         .text("Consconf")
//
//     // create the dots
//     svg.selectAll(".dot")
//         .data(data)
//       .enter().append("circle")
//         .attr("class", "dot")
//         .attr("r", 3.5)
//         .attr("cx", function(d) { return x(d.womenData); })
//         .attr("cy", function(d) { return y(d.consconfData); })
//         .style("fill", color);
//         //.style("fill", function(d) { return color(d.species); });
// };

// function addLegend(data){
//     var legend = svg.selectAll(".legend")
//         .data(color.domain())
//       .enter().append("g")
//         .attr("class", "legend")
//         .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
//
//     legend.append("rect")
//       .attr("x", width - 18)
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", color);
//
//     legend.append("text")
//       .attr("x", width - 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .style("text-anchor", "end")
//       .text(function(d) { return d; });
// };
