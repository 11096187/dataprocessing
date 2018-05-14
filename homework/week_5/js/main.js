/**
* Felicia van Gastel
* 11096187
*
* main.js
* beschrijving
*
**/

window.onload = function() {

  d3.queue()
      .defer(d3.json, "data/nld.json")
      .defer(d3.json, "data/data2006.json")
      .defer(d3.json, "data/data2016.json")
      .awaitAll(function(error, data){getData(error, data)});

  function getData(error, data) {
      if (error) throw error;

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
  // html code checken: alles wat je niet ziet in de head?
      // COMMENTS
        // comments ook in css en HTML
        // consistentie in taal, casing
        // inhoudelijk iets toevoegen
        // in head libraries inladen
      // FORMATTING
        // witregels, indentatie, spaties rondom operators en variabelen
      // FLOW
        // is het pad dat de computer volgt leesbaar?
        // niet meer nesting dan nodig
        // geen herhaalde code (maak gebruik van functies!)
      // IDIOM
        // zijn data types logisch?
        // zijn libraries goed benut?
      // VARIABLES
        // goede balans tussen parameters en variabelen
        // variabelen zijn beschrijvend, consistent in casing, goed geschreven
        // functies definieren binnen andere functies voor bijv create transform
      // DECOMPOSITIE
        // code verdelen in verschillende stukken: aparte files, aparte functies


// array.ForEach(function(d){
//     console.log(d)
// }

};
