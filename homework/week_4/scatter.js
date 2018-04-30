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

  console.log('Yes, you can!')
};

var womenInScience = "http://stats.oecd.org/SDMX-JSON/data/MSTI_PUB/TH_WRXRS.FRA+DEU+KOR+NLD+PRT+GBR/all?startTime=2007&endTime=2015"
var consConf = "http://stats.oecd.org/SDMX-JSON/data/HH_DASH/FRA+DEU+KOR+NLD+PRT+GBR.COCONF.A/all?startTime=2007&endTime=2015"

d3.queue()
  .defer(d3.request, womenInScience)
  .defer(d3.request, consConf)
  .awaitAll(check);

function check(error, response) {
  if (error) throw error;

  // Use response
  
};
