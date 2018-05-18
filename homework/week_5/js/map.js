/*
* Felicia van Gastel
* 11096187
*
* map.js
* script that makes the map
*
* Source: http://bl.ocks.org/phil-pedruco/9344373
*/

function makeMap (nld, data) {

    // iterate over the data file and separate into name and population value
    for (var i = 0; i < data.length; i++) {
        var dataProvince = data[i].province;
        var popTotal = data[i].popTotal;

        // iteratue over the nld data file and store state name in variable
        for (var j = 1; j < nld.objects.subunits.geometries.length; j++) {
            var mapProvince = nld.objects.subunits.geometries[j].properties.name;

            // link the population value if province names in the two files match
            if (dataProvince == mapProvince) {
                nld.objects.subunits.geometries[j].properties.value = popTotal;
                break;
            }
        }
    }

    // Define width, height and margins
    var margin = {top: 10, bottom: 20, left: 175, right: 200},
        mapHeight = 450 - margin.top - margin.bottom,
        mapWidth = 825 - margin.left - margin.right;

    //var provinceColor = d3.scale.category20c();
    var lowColor = "#c7e9c0";
    var highColor = "#00441b";

    // Push necessary data into array
    var popArray = [];
    popArray.length = 0;

    data.forEach(function(d) {
        popArray.push(d.popTotal)
    });

    // Get min/max of data to color code map later
    var minVal = d3.min(popArray);
    var maxVal = d3.max(popArray);
    console.log(minVal);
    console.log(maxVal);
    var provinceColor = d3.scale.linear()
        .domain([minVal, maxVal])
        .range([lowColor, highColor]);

    var projection = d3.geo.mercator()
        .scale(1)
        .translate([0, 0]);

    var mapPath = d3.geo.path()
        .projection(projection);

    var svg = d3.select(".map").append("svg")
        .attr("class", "map")
        .attr("width", mapWidth)
        .attr("height", mapHeight);

    var mapTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>" + d.properties.name + "</strong>" + "<br>" + "Total population: " + d3.format(",")(d.properties.value)
      });

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
        // create mouse events
        .call(mapTip)
        .on("mouseover", mapTip.show)
         // interactivity
        .on("mouseout", mapTip.hide)
        .on("click", function(d){
            d3.select(".selected").classed("selected", false);
            d3.select(this).classed("selected", true);
            var province = d.properties.name;
        		updatePie(province);
        });
    // Draw the map legend
    mapLegend(minVal, maxVal, lowColor, highColor);
};

function mapLegend(minVal, maxVal, lowColor, highColor) {

    var legendWidth = 110, legendHeight = 160;

    var svgLegend = d3.select("svg")
        .append("svg")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("class", "legend");

    var legend = svgLegend.append("defs")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    // Add gradient
    legend.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", highColor)
        .attr("stop-opacity", 1);

    legend.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", lowColor)
        .attr("stop-opacity", 1);

    svgLegend.append("rect")
        .attr("width", legendWidth - 80)
        .attr("height", legendHeight - 20)
        .style("fill", "url(#gradient)")
        .attr("transform", "translate(10,10)");

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
