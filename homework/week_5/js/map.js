/*
* Felicia van Gastel
* 11096187
*
* map.js
* script that makes the map and legend
*
* source: http://bl.ocks.org/phil-pedruco/9344373
*/

// function that makes the map
function makeMap (nld, data) {

    // iterate over the data file and separate into name and population value
    for (var i = 0; i < data.length; i++) {
        var dataProvince = data[i].province;
        var popTotal = data[i].popTotal;

        // iteratue over the nld data file and store province name in variable
        for (var j = 1; j < nld.objects.subunits.geometries.length; j++) {
            var mapProvince = nld.objects.subunits.geometries[j].properties.name;

            // link the population value if province names in the two files match
            if (dataProvince == mapProvince) {
                nld.objects.subunits.geometries[j].properties.value = popTotal;
                break;
            }
        }
    }

    // define width, height and margins
    var margin = {top: 10, bottom: 20, left: 175, right: 200},
        mapHeight = 450 - margin.top - margin.bottom,
        mapWidth = 825 - margin.left - margin.right;

    // define lowest and highest color for the map
    var lowColor = "#c7e9c0";
    var highColor = "#00441b";

    // push necessary data into array and clean (possible) initial array
    var popArray = [];
    popArray.length = 0;

    data.forEach(function(d) {
        popArray.push(d.popTotal)
    });

    // get min/max of data to color code map
    var minVal = d3.min(popArray);
    var maxVal = d3.max(popArray);

    // use the min and max data to color the provinces in the map
    var provinceColor = d3.scale.linear()
        .domain([minVal, maxVal])
        .range([lowColor, highColor]);

    var projection = d3.geo.mercator()
        .scale(1)
        .translate([0, 0]);

    var mapPath = d3.geo.path()
        .projection(projection);

    // set up svg
    var svg = d3.select(".map").append("svg")
        .attr("class", "map")
        .attr("width", mapWidth)
        .attr("height", mapHeight);

    // use tip to show names and values of provinces with interaction
    var mapTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>" + d.properties.name + "</strong>" + "<br>" + "Total population: " + d3.format(",")(d.properties.value)
      });

    // create map
    var l = topojson.feature(nld, nld.objects.subunits).features[3],
        b = mapPath.bounds(l),
        s = .2 / Math.max((b[1][0] - b[0][0]) / mapWidth, (b[1][1] - b[0][1]) / mapHeight),
        t = [(mapWidth - s * (b[1][0] + b[0][0])) / 2, (mapHeight - s * (b[1][1] + b[0][1])) / 2];

    projection
        .scale(s)
        .translate(t);

    var map = svg.selectAll("path")
        .data(topojson.feature(nld, nld.objects.subunits).features)
        .enter()
        .append("path")
        .attr("d", mapPath)
        .attr("fill", function(d, i) {
            return provinceColor(d.properties.value);
        })
        .attr("class", function(d, i) {
            return d.properties.name;
        })
        // call mouse events and interactivity
        .call(mapTip)
        .on("mouseover", mapTip.show)
        .on("mouseout", mapTip.hide)
        .on("click", function(d){
            d3.select(".selected").classed("selected", false);
            d3.select(this).classed("selected", true);

            // store the name of the province in variable
            var province = d.properties.name;

            // use this variable in function
        		updatePie(province);
        });

    // draw the map legend
    mapLegend(minVal, maxVal, lowColor, highColor);
};

// function to set up the legend of the map, using values and colors
function mapLegend(minVal, maxVal, lowColor, highColor) {

    // set up marges for legend
    var legendWidth = 110, legendHeight = 180;

    // place svg for legend
    var svgLegend = d3.select("svg")
        .append("svg")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("class", "legend");

    // add gradient
    var legend = svgLegend.append("defs")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    legend.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", highColor)
        .attr("stop-opacity", 1);

    legend.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", lowColor)
        .attr("stop-opacity", 1);

    // add rectangles
    svgLegend.append("rect")
        .attr("width", legendWidth - 80)
        .attr("height", legendHeight - 20)
        .style("fill", "url(#gradient)")
        .attr("transform", "translate(10,10)");

    // set up y axis
    var y = d3.scale.linear()
        .range([legendHeight - 20, 0])
        .domain([minVal, maxVal]);

    var yAxis = d3.svg.axis().scale(y)
        .orient("right")
        .ticks(6);

    svgLegend.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(41,11)")
        .call(yAxis)
};
