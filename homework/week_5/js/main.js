/**
* Felicia van Gastel
* 11096187
*
* main.js
* main script that gets the data and makes the charts
*
**/

// set up global variables
var data2006;
var data2016;
var data;

// load the 3 json files
window.onload = function() {
    d3.queue()
        .defer(d3.json, "data/nld.json")
        .defer(d3.json, "data/data2006.json")
        .defer(d3.json, "data/data2016.json")
        .awaitAll(function(error, data){getData(error, data)});
};

// stores the collected data in the global variables
function getData(error, data) {
    if (error) throw error;

    // storing the data with data 2006 as initial data
    nld = data[0];
    data2006 = data[1];
    data2016 = data[2];
    data = data2006;

    // set up initial title for map
    document.getElementById("mapTitle").innerHTML = "Population of Netherlands in year 2006";

    // call functions to make the map and the pie chart
    makeMap(nld, data);
    makePie(data);
};

// function that will be called when clicked on button with value
function changeYear(currentYear){

    // store the value from html
    var value = currentYear.value;

    // if value of button is of a certain year, load data of that year
    if (value == "2006"){
        data = data2006
        document.getElementById("mapTitle").innerHTML = "Population of Netherlands in year 2006";
    };

    if (value == "2016"){
        data = data2016
        document.getElementById("mapTitle").innerHTML = "Population of Netherlands in year 2016";
    };

    // remove the former visualizations
    d3.select(".map").select("svg").remove();
    d3.select(".pie").select("svg").remove();

    // make new visualizations with the new data
    makeMap(nld, data);
    makePie(data);
};
