//https://bl.ocks.org/mbostock/3887235

function makeChart(data) {
    var svg = d3.select('body').append('svg'),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scale.ordinal(["#98abc5", "#7b6888", "#a05d56"]);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.population; });

    var pathChart = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var label = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var arc = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", pathChart)
        .attr("fill", function(d) { return color(d.data.age); });

    arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .text(function(d) { return d.data.age; });
};
