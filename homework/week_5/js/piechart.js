/*
* Felicia van Gastel
* 11096187
*
* piechart.js
* script that makes a piechart visualization
*
* sources:
* https://bl.ocks.org/mbostock/3887235
* http://bl.ocks.org/NPashaP/96447623ef4d342ee09b
*/

// set up global variable to use in main
var updatePie;

// function that makes the pie chart
function makePie(data) {

    // set up margin for pie chart
    var margin = {top: 100, bottom: 100, left: 100, right: 200},
        h = 500 - margin.top - margin.bottom,
        w = 600 - margin.left - margin.right;

    // set up radius for pie
    var r = h/2;

    // set up color palette
    var aColor = d3.scale.category10();

    // loop over objects and store data object groups in obj
    for (let i = 0; i < 12; i++){
        var obj = data[i].popGroups;
    };

    // create svg for pie chart
    var piesvg = d3.select(".pie").append("svg:svg")
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
        .each(function(d) { this._current = d; });

    // set up initial title for pie chart
    document.getElementById("pieTitle").innerHTML = " Choose Province!";

    // set up legend
    var legend = d3.select("#pieDiv").append("svg")
      .attr("class", "legend")
      .attr("width", r + 80)
      .attr("height", r * 2)
      .selectAll("g")
      .data(obj)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // set up blocks and colors of legend
    legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) { return aColor(i); });

    // set up text of legend
    legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

    // function that will update the pie to the correct province
    function updatePies(province) {
        var pie = d3.layout.pie()
            .value( function(d) { return d.value; });

        // change title to chosen province
        document.getElementById("pieTitle").innerHTML = " Age groups in " + province.bold();

        // get new data from clicked province
        var dataNew;
        data.forEach(function(d){
            if (d.province == province) {
                dataNew = d.popGroups;
            };
        });

        // set up the transition of the pie, using actTween
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

    // makes it able to use the update function in another javascript
    updatePie = updatePies;
};
