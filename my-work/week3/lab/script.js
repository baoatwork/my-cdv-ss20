let viz = d3.select("#viz-container")
  .append("svg")
  .attr("wodth",800)
  .attr("height",600)

  ;


  function gotData(incomingData){


    viz.selectAll("circle").data(incomingData).enter()
    
  }

  d3.json("data.json").then(gotData);
