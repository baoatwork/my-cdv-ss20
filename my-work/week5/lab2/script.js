let w = 960;
let h = 640;
let xPadding = 70;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
;


function gotData(incomingData){
  console.log(incomingData);

  let mergedData = d3.merge(incomingData);


  //x scale
  function getX(d,i){
    return d.x;
  }
  let maxX = d3.max(mergedData,getX);

  let xScale = d3.scaleLinear().domain([0,maxX]).range([xPadding,w-xPadding]);
  let xAxisGroup = viz.append("g")
    .attr("class","xaxis");

  let xAxis = d3.axisBottom(xScale);

  xAxisGroup.call(xAxis);
  xAxisGroup.attr("transform","translate(0,"+(h-yPadding)+")");



  //y scale
  let maxY = d3.max(mergedData,function(d,i){
    return d.y;
  });

  let yScale = d3.scaleLinear().domain([0,maxY]).range([h-yPadding,yPadding]);
  let yAxisGroup = viz.append("g").attr("class","yaxis");
  let yAxis = d3.axisLeft(yScale);

  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform","translate("+xPadding+",0)");


  //group for viz
  let vizGroup = viz.append("g").attr("class","vizGroup");


  let dataIndex = 0;

  function visualizeData(){
    //get gotData
    let dataToShow = incomingData[dataIndex];


    function assignKeys(d,i){
      return d.name;
    }
    //viz
    let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow,assignKeys);

    let enteringElements = datagroups.enter()
    .append("g")
    .attr("class","datagroup")
    ;

    enteringElements.append("circle")
      .attr("r",30)
      .attr("fill","red")
      ;

    enteringElements.append("text")
      .text(function(d,i){
        return d.name;
      })
      .attr("x",-11)
      .attr("y",13)
      .attr("font-size",30)
      .attr("fill","white")
      ;



      function getGroupLocation(d,i){
        let x = xScale(d.x);
        let y = yScale(d.y);
        return "translate("+x+","+y+")";
      }
      function getIncomingLocation(d,i){
        let x = xScale(d.x);
        let y = -30;
        return "translate("+x+","+y+")";
      }
      function exitingLocation(d,i){
        let x = xScale(d.x);
        let y = h+30;
        return "translate("+x+","+y+")";
      }


      enteringElements.attr("transform",getIncomingLocation).transition().delay(1000).attr("transform",getGroupLocation);

      let exitingElements = datagroups.exit();
      exitingElements.transition().attr("transform",exitingLocation).delay(1000).remove();


      datagroups.select("text")
      .text(function(d,i){
        return d.name;
      });

      datagroups.transition().attr("transform",getGroupLocation);
  }

  // function step2(){
  //   //get gotData
  //   let dataToShow = incomingData[1];
  //
  //   //viz
  //   let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow);
  //
  //
  // //     .enter()
  // //     .append("g")
  // //     .attr("class","datagroup")
  // //
  // // ;
  // //
  // //   datagroups.append("circle")
  // //     .attr("r",30)
  // //     .attr("fill","red")
  // //     ;
  // //
  // //   datagroups.append("text")
  // //     .text(function(d,i){
  // //       return d.name;
  // //     })
  // //     .attr("x",-11)
  // //     .attr("y",13)
  // //     .attr("font-size",30)
  // //     .attr("fill","white")
  // //     ;
  //
  //     function getGroupLocation(d,i){
  //       let x = xScale(d.x);
  //       let y = yScale(d.y);
  //       return "translate("+x+","+y+")";
  //     }
  //
  //     datagroups.attr("transform",getGroupLocation);
  // }
  //
  // function step3(){
  //   //get gotData
  //   let dataToShow = incomingData[2];
  //
  //   //viz
  //   let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow);
  //
  //   let exitingElements = datagroups.exit();
  //
  //   exitingElements.remove();
  //
  // //     .enter()
  // //     .append("g")
  // //     .attr("class","datagroup")
  // //
  // // ;
  // //
  // //   datagroups.append("circle")
  // //     .attr("r",30)
  // //     .attr("fill","red")
  // //     ;
  // //
  // //   datagroups.append("text")
  // //     .text(function(d,i){
  // //       return d.name;
  // //     })
  // //     .attr("x",-11)
  // //     .attr("y",13)
  // //     .attr("font-size",30)
  // //     .attr("fill","white")
  // //     ;
  //
  //     function getGroupLocation(d,i){
  //       let x = xScale(d.x);
  //       let y = yScale(d.y);
  //       return "translate("+x+","+y+")";
  //     }
  //
  //     datagroups.attr("transform",getGroupLocation);
  // }
  //
  // function step4(){
  //   //get gotData
  //   let dataToShow = incomingData[3];
  //
  //
  //   //viz
  //   let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow);
  //
  //   let enteringElements = datagroups.enter()
  //     .append("g")
  //     .attr("class","datagroup");
  //
  //
  //   // let exitingElements = datagroups.exit();
  //   //
  //   // exitingElements.remove();
  //
  // //     .enter()
  // //     .append("g")
  // //     .attr("class","datagroup")
  // //
  // // ;
  // //
  //   enteringElements.append("circle")
  //     .attr("r",30)
  //     .attr("fill","red")
  //     ;
  //
  //   enteringElements.append("text")
  //     .text(function(d,i){
  //       return d.name;
  //     })
  //     .attr("x",-11)
  //     .attr("y",13)
  //     .attr("font-size",30)
  //     .attr("fill","white")
  //     ;
  //
  //     function getGroupLocation(d,i){
  //       let x = xScale(d.x);
  //       let y = yScale(d.y);
  //       return "translate("+x+","+y+")";
  //     }
  //
  //     enteringElements.attr("transform",getGroupLocation);
  //     datagroups.attr("transform",getGroupLocation);
  // }

  document.getElementById("step1").addEventListener("click",function(){
    dataIndex = 0;
    visualizeData();
  });
  document.getElementById("step2").addEventListener("click",function(){
    dataIndex = 1;
    visualizeData();
  });
  document.getElementById("step3").addEventListener("click",function(){
      dataIndex = 2;
      visualizeData();
    });
    document.getElementById("step4").addEventListener("click",function(){
      dataIndex = 3;
      visualizeData();
    });
}



d3.json("data.json").then(gotData);
