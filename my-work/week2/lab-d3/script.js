console.log("I am working!");


let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id","viz")
    .attr("width",600)
    .attr("height",600)
;


// viz.attr("height",400);
//
// let circle = viz.append("circle")
//     .attr("cx",250)
//     .attr("cy",200)
//     .attr("r",20)
// ;
//
// circle.attr("fill","white");


let data = [4,6,8,2,5];

d3.json("data.json").then(gotData);

function gotData(import){


  viz.selectAll("circle").data(import).enter()
}

// function randomPlacement(wow){
//   return wow * 50;
// }
//
// viz.selectAll("haha").data(data).enter()
//   .append("circle")
//     .attr("cx",randomPlacement)
//     .attr("cy",180)
//     .attr("r",20)
//   ;
