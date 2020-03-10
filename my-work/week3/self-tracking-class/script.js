let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id","viz")
    .attr("width",1000)
    .attr("height",600)
;





function gotData(newData){
  console.log(newData);

   let draw= viz.selectAll(".happyStick").data(newData).enter()
              .append("g")
              .attr("class","happyStick");



     draw.append("rect")
     .attr("x",xPosition)
     .attr("y",yPosition)
     .attr("width",10)
     .attr("height",150)
     .attr("fill",whatColor)

  ;

    draw.append("circle")
    .attr("cx",xPosition)
    .attr("cy",yPosition)
    .attr("r",whatRadius)
    .attr("fill",whatColorCircle)

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

function whatRadius(sample){
  check = sample.container;

  if(check == "Plastic Bottle"){
    return 5;
  }else if(check == "Cup"){
    return 10;
  }else{
    return 20;
  }
}


function whatColorCircle(sample){
  check = sample.heat;

  if (check == "Cold"){
    return "#434343";
  }else if (check == "Warm"){
    return "#FFBA84";
  }else {
    return "#AB3B3A";
  }
}
