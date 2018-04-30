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
      .awaitAll(function(error, data){check(error, data)});

  var array = [];

  function check(error, response) {
      if (error) throw error;

      console.log(response)

      // Use response
      var data0 = JSON.parse(response[0].responseText)
      var data1 = JSON.parse(response[1].responseText)

      for (let i = 0; i < 1; i++){
          for (let j = 0; j < 6; j++){
              console.log(i + ":" + j);
              var iets = i + ":" + j;
              console.log(data0.dataSets[0].series[iets].observations[0][0]);
              array.push(data0.dataSets[0].series[iets].observations[0][0])
          }
      }

  };

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.selectAll("circle")
   .data(array)
   .enter()
   .append("circle")
   .attr("cx", function(d) {
      return d[0];
    })
   .attr("cy", function(d) {
      return d[1];
    })
   .attr("r", 5);

   console.log(array);

};
