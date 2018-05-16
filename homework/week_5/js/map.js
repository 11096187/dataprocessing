// http://bl.ocks.org/phil-pedruco/9344373
/*
* Felicia van Gastel
* 11096187
*
*
*/

function makeMap (nld, data) {
    var mapWidth = 500,
        mapHeight = 500;

    var provinceColor = d3.scale.category20c();

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
        return "<strong>" + d.properties.name + "</strong>" + "<br>" + "Total population: " + (d.properties.value)
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

    // // create the legend
    // var key = d3.select("svg")
    //     .append("svg")
    //     .attr("width", 140)
    //     .attr("height", 150)
    //     .attr("class", "legend");
    //
    // var legend = key.append("defs")
    //     .append("svg:linearGradient")
    //     .attr("id", "gradient")
    //     .attr("x1", "100%")
    //     .attr("y1", "0%")
    //     .attr("x2", "100%")
    //     .attr("y2", "100%")
    //     .attr("spreadMethod", "pad");
    //
    // // set top of legend
    // legend.append("stop")
    //     .attr("offset", "0%")
    //     .attr("stop-color", highColor)
    //     .attr("stop-opacity", 1);
    //
    // // set bottom of legend
    // legend.append("stop")
    //     .attr("offset", "100%")
    //     .attr("stop-color", lowColor)
    //     .attr("stop-opacity", 1);
    //
    // // append rectangle for the legend
    // key.append("rect")
    //     .attr("width", 20)
    //     .attr("height", 150)
    //     .style("fill", "url(#gradient)")
    //     .attr("transform", "translate(20,10)");
    //
    // // create y variable
    // var y = d3.scaleLinear()
    //     .range([150, 0])
    //     .domain([min, max]);
    //
    // // create y axis
    // var yAxis = d3.axisRight(y);
    //
    // // set y axis
    // key.append("g")
    //     .attr("class", "yaxis")
    //     .attr("transform", "translate(41,10)")
    //     .call(yAxis)
};
