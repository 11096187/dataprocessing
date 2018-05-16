/*
* Felicia van Gastel
* 11096187
*
* piechart.js
* script for a piechart
*
*/

//https://bl.ocks.org/mbostock/3887235
//http://bl.ocks.org/NPashaP/96447623ef4d342ee09b
var updatePie;

function makePie(data) {

  var w = 300;
  var h = 300;
  var r = h/2;
  var aColor = d3.scale.category10();

  // loop over objects
  for (let i = 0; i < 12; i++){
      var obj = data[i].popGroups;
      var objectKeys = Object.keys(obj); // => ["name", "surname"]
      // objectKeys.forEach(function(d){
      // });
  }

  // create svg for pie chart
  var piesvg = d3.select('.pie').append("svg:svg")
      .data([obj])
      .attr("width", w)
      .attr("height", h)
      .append("svg:g")
      .attr("transform", "translate(" + r + "," + r + ")");

  // create a function to compute the pie slice angles
  var pie = d3.layout.pie()
      .value(function(d){return d.value;});

  // create function to draw the arcs of the pie slices
  var arc = d3.svg.arc().outerRadius(r);

  // select paths, use arc generator to draw
  var arcs = piesvg.selectAll("g.slice")
      .data(pie).enter()
      .append("svg:g").attr("class", "slice");
  arcs.append("svg:path")
      .attr("fill", function(d, i){ return aColor(i); })
      .attr("d", function (d) { return arc(d); })
      .each(function(d) { this._current = d; })

  document.getElementById("pieTitle").innerHTML = " Choose Province!";

  // // add the text
  // arcs.append("svg:text")
  //     .attr("transform", function(d){
  //         d.innerRadius = 100; /* Distance of label to the center*/
  //         d.outerRadius = r;
  //         return "translate(" + arc.centroid(d) + ")";})
  //     .attr("text-anchor", "middle")
  //     .text( function(d, i) { return obj[i].value; });


  function updatePies(province) {
      var pie = d3.layout.pie()
          .value(function(d){return d.value;});

      document.getElementById("pieTitle").innerHTML = " Population of " + province.bold();

      // get data from clicked province
      var dataNew;
      data.forEach(function(d){
          if (d.province == province) {
              dataNew = d.popGroups;
        }
      })
      console.log(dataNew);
      // getPopulationValues(province);

      d3.select(".pie").select("svg").selectAll("path") //path
          .data(pie(dataNew)).transition().duration(500)
          .attrTween("d", arcTween);

      // Store the displayed angles in _current.
      // Then, interpolate from _current to the new angles.
      // During the transition, _current is updated in-place by d3.interpolate.
      function arcTween(a) {
          var i = d3.interpolate(this._current, a)
          this._current = i(0);
          return function(t) { return arc(i(t)); };
      }
  };
  updatePie = updatePies;
};
