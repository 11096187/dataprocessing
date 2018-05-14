//https://bl.ocks.org/mbostock/3887235

function makeChart(data) {

  var chartWidth = 400,
      chartHeight = 400,
      radius = Math.min(chartWidth, chartHeight) / 2;

  var svg = d3.select("body").append("svg")
      .attr("class", "chart")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

  var  g = svg.append("g").attr("transform", "translate(" + chartWidth / 2 + "," + chartHeight / 2 + ")");

  var color = d3.scale.ordinal(["#98abc5", "#7b6888", "#a05d56"]);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.pop0_14; });

  var chartPath = d3.svg.arc()
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
      .attr("d", chartPath)
      .attr("fill", function(d) { return color(d.pop0_14); });

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.pop0_14; });
};

// VOOR PIECHART OM OVER OBJECTEN HEEN TE LOOPEN
var obj = {"name":"tim", "surname", "Meijer"}
var objectKeys = Object.keys(obj); // => ["name", "surname"]
objectKeys.forEach(function(d){
  console.log(obj[d])// => Tim, Meijer
})
