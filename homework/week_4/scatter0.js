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

  var womenInScience = "http://stats.oecd.org/SDMX-JSON/data/MSTI_PUB/TH_WRXRS.FRA+DEU+KOR+NLD+PRT+GBR/all?startTime=2007&endTime=2015"
  var consConf = "http://stats.oecd.org/SDMX-JSON/data/HH_DASH/FRA+DEU+KOR+NLD+PRT+GBR.COCONF.A/all?startTime=2007&endTime=2015"

  var q = d3.queue()
      .defer(d3.request, womenInScience)
      .defer(d3.request, consConf)
      .awaitAll(function(error, data){getData(error, data)});

  var womenData = [];
  var consconfData = [];

  function getData(error, response) {
      if (error) throw error;

      // Use response to receive data from webserver in json format
      var data0 = JSON.parse(response[0].responseText)
      var data1 = JSON.parse(response[1].responseText)

      // Get the right data and push data0 in its array
      for (let i = 0; i < 1; i++){
          for (let j = 0; j < 6; j++){
              var char0 = i + ":" + j;
              womenData.push(data0.dataSets[0].series[char0].observations[0][0]);
          }
      }

      // Get the right data and push data1 in its array
      for (let i = 0; i < 6; i++){
          for (let j = 0; j < 1; j++){
              for (let k = 0; k < 1; k++){
                  var char1 = i + ":" + j + ":" + k;
                  consconfData.push(data1.dataSets[0].series[char1].observations[0][0]);
              }
          }
      }

      // store the two arrays in data
      var data = [womenData, consconfData];
      console.log(data);

      // store data
      data.forEach(function(d) {
          d.womenData = +d.womenData;
          d.consconfData = +d.consconfData;
        });

      makeScatter(data);
      // addLegend(data);
  };

};

function makeScatter(data){

    var margin = {top: 20, right: 20, bottom: 30, left: 80},
    width = 960 - margin.left - margin.right,
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

    x.domain(d3.extent(data, function(d) { return d.womenData; })).nice();
    y.domain(d3.extent(data, function(d) { return d.consconfData; })).nice();

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
        .text("Women in science");

    // create y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Consconf")

    // create the dots
    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.womenData); })
        .attr("cy", function(d) { return y(d.consconfData); })
        .style("fill", color);
        //.style("fill", function(d) { return color(d.species); });
};

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
