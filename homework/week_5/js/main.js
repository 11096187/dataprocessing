window.onload = function() {

    queue()
    	.defer(d3.json, "data/data2006.json")
    	.defer(d3.json, "data/data2016.json")
      .defer(d3.json, "data/nld.json")
      .await(makeMap);

    function makeMap () {
        if (error) throw error;

    }
}
