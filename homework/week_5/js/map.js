// http://bl.ocks.org/phil-pedruco/9344373
/*
* Felicia van Gastel
* 11096187
*
*
*/

function makeMap (nld, data) {
    // var mapWidth = 500,
    //     mapHeight = 500;

    // Define width, height and margins
    var margin = {top: 10, bottom: 20, left: 175, right: 200},
        mapHeight = 450 - margin.top - margin.bottom,
        mapWidth = 825 - margin.left - margin.right,
        downscale = 0.7;

    //var provinceColor = d3.scale.category20c();
    var lowColor = "#f9f9f9"
    var highColor = "#92B558"

    // Push necessary data into array
    var popArray = [];
    data.forEach(function(d) {
        popArray.push(d.popTotal)
    });
    console.log(popArray)

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
            return provinceColor(i);
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
    makeLegend(minVal, maxVal, lowColor, highColor);
};

function makeLegend(minVal, maxVal, lowColor, highColor) {

    var legendWidth = 110, legendHeight = 170;

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
        .attr("height", legendHeight)
        .style("fill", "url(#gradient)")
        .attr("transform", "translate(10,10)");

    var y = d3.scale.linear()
        .range([legendHeight, 0])
        .domain([minVal, maxVal]);

    // var yAxisRight = d3.svg.axis().scale(y1)

    var yAxis = d3.svg.axis().scale(y)
        .orient("right")
        .ticks(7);

    svgLegend.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(41,10)")
        .call(yAxis)
}
