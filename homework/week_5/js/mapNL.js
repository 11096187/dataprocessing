// http://bl.ocks.org/phil-pedruco/9344373

window.onload = function() {

  // queue()
  //       .defer(d3.json, "data/nld.json")
  //       .defer(d3.json, "data/data2006.json")
  //       .defer(d3.json, "data/data2016.json")
  //       .await(makeMap);

  // function makeMap (error, nld, data2006, data2016) {

d3.queue()
    .defer(d3.json, "data/nld.json")
    .defer(d3.json, "data/data2006.json")
    .defer(d3.json, "data/data2016.json")
    .await(ready);

// WHY IS MY DATA NOT LOADING WHEN I USE THIS?

function ready(error, nld, data2006, data2016) {

    console.log(nld)
    console.log(data2006)
    console.log(data2016)

    var width = 500,
        height = 500;

    var colour = d3.scale.category20();

    var projection = d3.geo.mercator()
        .scale(1)
        .translate([0, 0]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("body").append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    var mapTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Population:</strong>"
      });

    var l = topojson.feature(nld, nld.objects.subunits).features[3],
        b = path.bounds(l),
        s = .2 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

    projection
        .scale(s)
        .translate(t);

    svg.selectAll("path")
        .data(topojson.feature(nld, nld.objects.subunits).features).enter()
        .append("path")
        .attr("d", path)
        .attr("fill", function(d, i) {
            return colour(i);
        })
        .attr("class", function(d, i) {
            return d.properties.name;
        })
        // create mouse events
        .call(mapTip)
        .on('mouseover', mapTip.show) // interactivity
        .on('mouseout', mapTip.hide);
  };
};
