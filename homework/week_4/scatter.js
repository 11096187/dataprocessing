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

    function check(error, response) {
      if (error) throw error;

    // Use response
    var dataWomen = JSON.parse(response[0].responseText)
    var dataConsConf = JSON.parse(response[1].responseText)

    };

};
