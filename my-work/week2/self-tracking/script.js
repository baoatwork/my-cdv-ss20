let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id","viz")
    .attr("width",1000)
    .attr("height",600)
;





function gotData(newData){
  console.log(newData);

   let draw= viz.selectAll("rect").data(newData).enter()

   draw.append("rect")
     .attr("x",xPosition)
     .attr("y",yPosition)
     .attr("width",10)
     .attr("height",150)
     .attr("fill",whatColor)

  ;
}

d3.json("myData.json").then(gotData);

function whatColor(sample){
  check = sample.type;
  if (check == "Milk"){
    return "#F6C555";
  }else if(check == "Water"){
    return "#33A6B8";
  }else if(check == "Soup"){
    return "#8F77B5";
  }else if(check == "Yogurt"){
    return "#F75C2F";
  }
}


function xPosition(sample){
  return sample.seq *20;

}

function yPosition(sample){
  check = sample.location;

  if (check == "Canteen"){
    return 10;
  }else if(check == "Office Building"){
    return 210;
  }else{
    return 410;
  }
}
