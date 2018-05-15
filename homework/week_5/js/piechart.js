//https://bl.ocks.org/mbostock/3887235

function makeChart(data) {

  var w = 350;
  var h = 350;
  var r = h/2;
  var aColor = [
      'rgb(178, 55, 56)',
      'rgb(213, 69, 70)',
      'rgb(230, 125, 126)',
      'rgb(239, 183, 182)'
  ]

  // var data = [
  //     {"label":"Colorectale levermetastase (n=336)", "value":74},
  //     {"label": "Primaire maligne levertumor (n=56)", "value":12},
  //     {"label":"Levensmetatase van andere origine (n=32)", "value":7},
  //     {"label":"Beningne levertumor (n=34)", "value":7}
  // ];

  // var obj = data
  // var objectKeys = Object.keys(obj);
  // objectKeys.forEach(function(d){
  //     console.log(obj[d])
  // })


  // VOOR PIECHART OM OVER OBJECTEN HEEN TE LOOPEN
  var obj = data[0].popGroups;
  var objectKeys = Object.keys(obj); // => ["name", "surname"]
  objectKeys.forEach(function(d){
    console.log(obj[d])// => Tim, Meijer
  })

  var vis = d3.select('.chart').append("svg:svg")
      .data([obj])
      .attr("width", w)
      .attr("height", h)
      .append("svg:g")
      .attr("transform", "translate(" + r + "," + r + ")");

  var pie = d3.layout.pie().value(function(d){return d.value;});

  // Declare an arc generator function
  var arc = d3.svg.arc().outerRadius(r);

  // Select paths, use arc generator to draw
  var arcs = vis.selectAll("g.slice")
      .data(pie).enter()
      .append("svg:g").attr("class", "slice");
  arcs.append("svg:path")
      .attr("fill", function(d, i){return aColor[i];})
      .attr("d", function (d) {return arc(d);})
  ;

  // Add the text
  arcs.append("svg:text")
      .attr("transform", function(d){
          d.innerRadius = 100; /* Distance of label to the center*/
          d.outerRadius = r;
          return "translate(" + arc.centroid(d) + ")";}
      )
      .attr("text-anchor", "middle")
      .text( function(d, i) {return obj[i].value;})
  ;
};
