window.onload = function() {

  d3.queue()
      .defer(d3.json, "data/nld.json")
      .defer(d3.json, "data/data2006.json")
      .defer(d3.json, "data/data2016.json")
      .awaitAll(function(error, data){getData(error, data)});

  function getData(error, data) {
      if (error) throw error;

      console.log(data[0])

      nld = data[0];
      data = data[1];

      // iterate over the data file and separate into name and value
      for (var i = 0; i < data.length; i++) {
          var dataProvince = data[i].province;
          var popTotal = data[i].popTotal;

          // iteratue over the us data file and store state name in variable
          for (var j = 1; j < nld.objects.subunits.geometries.length; j++) {
              var mapProvince = nld.objects.subunits.geometries[j].properties.name;

              // link the population value if state names in the two files match
              if (dataProvince == mapProvince) {
                  nld.objects.subunits.geometries[j].properties.value = popTotal;
                  break;
              }
          }
      }
      makeMap(nld, data);
      makeChart(data);
  };



  // // update year
  // d3.selectAll(".year")
  //   .on("click", function(){
  //
  //     // get data for selected year
  //     var value = this.getAttribute("value");
  //
  //     if (value == "2000"){
  //         data = data2000
  //     };
  //     if (value == "2014"){
  //         data = data2014
  //     };
  //     updateYear(data);
  // });

  // TODO :
  // pie chart maken
  // titels toevoegen aan charts
  // kleuren en legenda toevoegen aan map
  // charts linken
  // charts kunnen updaten
  // storytelling

};
