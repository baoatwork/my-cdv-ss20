function randomTranslate(){
  let x = Math.random()*500;
  let y = Math.random()*500;
  return "translate(" + x + "," + y + ")";
}

function gotData(incomingData){
  // create svg
  let viz = d3.select("body")
    .append("svg")
      .attr("width", 500)
      .attr("height", 500)
  ;
  // append groups
  let groupelements = viz.selectAll(".datagroup").data(incomingData)
    .enter()
      .append("g")
      .attr("class", "datagroup")
  ;
  // append circles
  groupelements.append("circle")
      .attr("cx",0)
      .attr("cy",0)
      .attr("r", 20)
  ;
  // append text
  groupelements.append("text")
      .text("hello")
      .attr("x",20)
      .attr("y",20)
      .attr("fill", "red")
  ;
  // position groups (this could also be part of the
  // section where we created the groups in the first place).
  groupelements.attr("transform", randomTranslate);
}

// get data
d3.json("data.json").then(gotData);
