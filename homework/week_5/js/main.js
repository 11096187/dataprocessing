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
      makePie(data);
    }
};

  // TODO :
  // KLEUREN EN LEGENDA TOEVOEGEN

  // UPDATEFUNCTIE JAAR TOEVOEGEN

  // STORYTELLING
      /*

      The following visualization will show information about the population in
      the provinces of the Netherlands. In the left figure (the map) you can click
      on a province and the corresponding data will be shown in the right figure (the pie chart).
      The total population per province for a specified year is visualized in the left figure
      while the age group distribution per province is shown in the right figure.
      Different years can be selected using the dropdown button. The default year is 2006.
      These visualizations can be used to find the province with the highest population,
      while also comparing the age groups of the population and the difference of these values
      between the years 2006 and 2016.

      */

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
