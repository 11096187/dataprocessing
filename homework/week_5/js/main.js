/**
* Felicia van Gastel
* 11096187
*
* main.js
* beschrijving
*
**/

var data2006;
var data2016;
var data;
var dataArray = [];
var dataProvince;
var popTotal;
var mapProvince;

window.onload = function() {

    d3.queue()
        .defer(d3.json, "data/nld.json")
        .defer(d3.json, "data/data2006.json")
        .defer(d3.json, "data/data2016.json")
        .awaitAll(function(error, data){getData(error, data)});
};

function getData(error, data) {
    if (error) throw error;

    nld = data[0];
    data2006 = data[1];
    data2016 = data[2];
    data = data2006;

    document.getElementById("mapTitle").innerHTML = "Population of Netherlands in year 2006";

    makeMap(nld, data);
    makePie(data);
};


console.log(data2006);
console.log(data2016);


function changeYear(currentYear){

    var value = currentYear.value;

    console.log(value);

    if (value == "2006"){
        data = data2006
        document.getElementById("mapTitle").innerHTML = "Population of Netherlands in year 2006";
    };

    console.log(data);

    if (value == "2016"){
        data = data2016
        document.getElementById("mapTitle").innerHTML = "Population of Netherlands in year 2016";
    };

    console.log(data);

    d3.select(".map").select("svg").remove();
    d3.select(".pie").select("svg").remove();
    makeMap(nld, data);
    makePie(data);
    console.log(data);
};

// // update chart
// d3.selectAll(".year")
//   .on("click", function(){
//
//     // get data for selected year
//     var value = this.getAttribute("value");
//
//     if (value == "2006"){
//         data = data[1]
//     };
//     if (value == "2016"){
//         data = data[2]
//     };
//     makeMap(nld, data);
// });

  // TODO :
  // LEGENDA TOEVOEGEN PIECHART

  // UPDATEFUNCTIE JAAR WERKEND KRIJGEN


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
