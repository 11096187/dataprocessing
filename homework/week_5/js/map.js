// http://bl.ocks.org/phil-pedruco/9344373

function makeMap (nld, data) {
    var mapWidth = 500,
        mapHeight = 500;

    var provinceColor = d3.scale.category20();

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
        return "<strong>" + d.properties.name + "</strong>" + "<br>" + "Population: " + (d.properties.value)
      });

    var l = topojson.feature(nld, nld.objects.subunits).features[3],
        b = mapPath.bounds(l),
        s = .2 / Math.max((b[1][0] - b[0][0]) / mapWidth, (b[1][1] - b[0][1]) / mapHeight),
        t = [(mapWidth - s * (b[1][0] + b[0][0])) / 2, (mapHeight - s * (b[1][1] + b[0][1])) / 2];

    projection
        .scale(s)
        .translate(t);

    svg.selectAll("path")
        .data(topojson.feature(nld, nld.objects.subunits).features).enter()
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
        .on('mouseover', mapTip.show) // interactivity
        .on('mouseout', mapTip.hide);
};
