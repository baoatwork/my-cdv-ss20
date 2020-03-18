let origin=[];

let viz = d3.select("#container")
  .append("svg")
    .attr("id","viz")
    .attr("width",5000)
    .attr("height",1000)
;





function gotData(newData){
  //console.log(newData);

  let drinkMilk = newData.filter(filterMilk);
  console.log(drinkMilk);

  let drinkWater = newData.filter(filterWater);

  let drinkSoup = newData.filter(filterSoup);

  let drinkYogurt = newData.filter(filterYogurt);


  let drawMilk= viz.selectAll(".happyMilk").data(drinkMilk).enter()
              .append("g")
              .attr("class","happyMilk");

      drawMilk.append("rect")
      .attr("x",xPosition)
      .attr("y",yPosition)
      .attr("width",40)
      .attr("height",40)
      .attr("fill",whatColor)

      ;

  let drawWater= viz.selectAll(".happyWater").data(drinkWater).enter()
              .append("g")
              .attr("class","happyWater");

      drawWater.append("circle")
      .attr("cx",xPosition)
      .attr("cy",yPosition)
      .attr("r",20)
      .attr("fill",whatColor)

      ;



  //    draw.append("rect")
  //    .attr("x",xPosition)
  //    .attr("y",yPosition)
  //    .attr("width",10)
  //    .attr("height",150)
  //    .attr("fill",whatColor)
  //
  // ;
  //
  //   draw.append("circle")
  //   .attr("cx",xPosition)
  //   .attr("cy",yPosition)
  //   .attr("r",20)
  //   .attr("fill",whatColor)
  //
  //
  // ;
  //
  //
  //
  //
  //   draw.append("ellipse")
  //   .attr("cx",2000)
  //   .attr("cy",100)
  //   .attr("rx",12)
  //   .attr("ry",20)
  //   .attr("fill","#00896C")
  //
  //   ;
  //
  //
  //   draw.append("ellipse")
  //   .attr("cx",2000)
  //   .attr("cy",100)
  //   .attr("rx",8)
  //   .attr("ry",14)
  //   .attr("fill","white")
  //
  //   ;


}


//got my data
 d3.json("js/myData.json").then(gotData);



function filterMilk(sample){
  if(sample.type == "Milk"){
    return true;
  }else{
    return false;
  }

}

function filterWater(sample){
  if(sample.type == "Water"){
    return true;
  }else{
    return false;
  }

}

function filterSoup(sample){
  if(sample.type == "Soup"){
    return true;
  }else{
    return false;
  }

}

function filterYogurt(sample){
  if(sample.type == "Yogurt"){
    return true;
  }else{
    return false;
  }

}



function whatColor(sample){
  check = sample.heat;
  if (check == "Warm"){
    return "#FB966E";
  }else if(check == "Cold"){
    return "#33A6B8";
  }else if(check == "Hot"){
    return "#CB4042";
  }
}


function xPosition(sample,i){

  return sample.seq *20;

}

function yPosition(sample){
  check = sample.location;

  if (check == "Canteen"){
    return 100;
  }else if(check == "Office Building"){
    return 400;
  }else{
    return 700;
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


function xPositionPage3(sample){
  check = sample.date;
}
