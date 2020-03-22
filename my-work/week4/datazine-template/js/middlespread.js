let date1=[[],[],[],[],[],[],[]];
let date2=[[],[],[],[],[],[],[]];
let date3=[[],[],[],[],[],[],[]];
let date4=[[],[],[],[],[],[],[]];
let date5=[[],[],[],[],[],[],[]];
let date6=[[],[],[],[],[],[],[]];

let howMany =[{"day": 1,
               "cups":7},
              {"day":2,
               "cups":9},
              {"day":3,
               "cups":6},
              {"day":4,
               "cups":8},
              {"day":5,
               "cups":8},
              {"day":6,
               "cups":6},
              {"day":7,
               "cups":7}




];


let average=7;
let dayNow = 0;

let viz = d3.select("#container")
  .append("svg")
    .attr("id","viz")
    .attr("width",5000)
    .attr("height",1000)
;




viz.append("svg:image")
   .attr("xlink:href","resource/paper.png")
   .attr("width",1200)
   .attr("x",0)
   .attr("y",0)

;

viz.append("svg:image")
   .attr("xlink:href","resource/paperreverse.png")
   .attr("width",1200)
   .attr("x",1200)
   .attr("y",0)

;






function gotData(newData){
  //console.log(newData);





  let draw= viz.selectAll(".happyStick").data(newData).enter()
              .append("g")
              .attr("class","happyStick");

      draw.append("line")
      .attr("x1",xPosition1)
      .attr("y1",yPosition1)
      .attr("x2",xPosition2)
      .attr("y2",yPosition1)
      .attr("stroke",whatColor)
      .attr("stroke-width",10)
      .attr("stroke-dasharray",dash1)

      ;

      draw.append("line")
      .attr("x1",xPosition3)
      .attr("y1",yPosition2)
      .attr("x2",xPosition4)
      .attr("y2",yPosition2)
      .attr("stroke",whatColor)
      .attr("stroke-width",10)
      .attr("stroke-dasharray",dash2)

      ;


      draw.append("line")
      .attr("x1",xPosition5)
      .attr("y1",yPosition3)
      .attr("x2",xPosition6)
      .attr("y2",yPosition3)
      .attr("stroke",whatColor)
      .attr("stroke-width",10)
      .attr("stroke-dasharray",dash3)

      ;





}


//got my data
 d3.json("js/myData.json").then(gotData);







let yinyang =viz.selectAll(".yinYang").data(howMany).enter();


yinyang.append("svg:image")
    .attr("xlink:href",whichImg)
    .attr("width",130)
    .attr("height",130)
    .attr("x",yinyangX)
    .attr("y",yinyangY)

 ;


 yinyang.append("text")
    .text(whatDay)
    .attr("font-family",'Liu Jian Mao Cao')
    .attr("font-size",30)
    .attr("x",130)
    .attr("y",dayY)

;





 viz.append("svg:image")
    .attr("xlink:href","resource/song.png")
    .attr("width",700)
    .attr("x",1700)
    .attr("y",-20)

;

viz.append("svg:image")
   .attr("xlink:href","resource/he.png")
   .attr("width",350)
   .attr("x",1500)
   .attr("y",450)

;

//For day 1-7
function whatDay(sample){
  dayNow = dayNow + 1;

  return "Day "+  dayNow;
}

function dayY(sample){
  return sample.day *100 ;
}

//for the yinyang image

function whichImg(sample){
  check = sample.cups;

  if(check > average){
    return "resource/yang.png";
  }else{
    return "resource/yin.png";
  }
}

function yinyangY(sample){
  return sample.day * 100 -72;
}

function yinyangX(sample){
  check = sample.cups;
  if(check > average){
    return 30;
  }else{
    return 20;
  }
}

// for the look of the bar

function dash1(sample){
  check = sample.type;
  if (check == "Water"){
    return "100,10";
  }else if (check == "Soup"){
    return "45,35";
  }else if(check == "Yogurt"){
    return "0,45,35";
  }else if (check == "Milk"){
    return "35,10,35";
  }
}

function dash2(sample){
  check = sample.container;
  if (check == "Plastic bottle"){
    return "100,10";
  }else if (check == "Glass"){
    return "45,35";
  }else if(check == "Bowl"){
    return "0,45,35";
  }else if (check == "Cup"){
    return "35,10,35";
  }
}

function dash3(sample){
  check = sample.location;
  if (check == "Office Building"){
    return "100,10";
  }else if (check == "Home"){
    return "45,35";
  }else if(check == "Outdoors"){
    return "0,45,35";
  }else if (check == "Canteen"){
    return "35,10,35";
  }
}



function whatColor(sample){
  check = sample.heat;
  if (check == "Warm"){
    return "#FB966E";
  }else if(check == "Cold"){
    return "#66BAB7";
  }else if(check == "Hot"){
    return "#CB4042";
  }else if(check == "Icy"){
    return "#1E88A8";
  }
}


// for the position of the bars

function xPosition1(sample,i){

  check = sample.day -1;

  date1[check].push(1);
   //console.log(date1[check].length);

  return date1[check].length * 160 +100;


}

function xPosition2(sample,i){
  check = sample.day -1;

  date2[check].push(1);
  // console.log(date2[check].length);

  return date2[check].length * 160 + 180;
}

function xPosition3(sample,i){
  check = sample.day -1;

  date3[check].push(1);
   //console.log(date3[check].length);

  return date3[check].length * 160 +100;
}

function xPosition4(sample,i){
  check = sample.day -1;

  date4[check].push(1);
  // console.log(date4[check].length);

  return date4[check].length * 160 + 180;
}

function xPosition5(sample,i){
  check = sample.day -1;

  date5[check].push(1);
   //console.log(date5[check].length);

  return date5[check].length * 160 +100;
}

function xPosition6(sample,i){
  check = sample.day -1;

  date6[check].push(1);
  // console.log(date6[check].length);

  return date6[check].length * 160 + 180;
}




function yPosition1(sample){
  check = sample.day;

  return check*100-25;
}

function yPosition2(sample){
  check = sample.day;

  return check*100-5;
}

function yPosition3(sample){
  check = sample.day;
  return check *100 +15;
}
