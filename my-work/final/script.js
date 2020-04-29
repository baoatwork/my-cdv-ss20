
let w = 1600;
let h = 800;
let padding = 20;

let lat =31.22773;
let lon = 121.53946;

let enterMap =false;
let enterTime;
let playOnce = false;

//preload
function preload(){
  welcomeBgm = loadSound("sound/welcome.mp3");
  mainBgm1 = loadSound("sound/main1.mp3");
  mainBgm2 = loadSound("sound/main2.mp3");
}

function setup(){
  userStartAudio();
  welcomeBgm.loop();
}

function draw(){
  if (enterMap){
    if(millis()>enterTime + 3000){
      mainBgm1.play();
      enterMap =false;
      playOnce = true;
    }
  }

  if(playOnce && !mainBgm1.isPlaying()){
    welcomeBgm.stop();
    mainBgm2.loop();
    playOnce =false;
  }
}

// SVG
let viz = d3.select(".container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "#fef8f8")
;

//geojson map
d3.json("mainland.geojson").then(function(geoData){
  console.log(geoData);

  let projection = d3.geoPatterson()
     .fitExtent([[-850,-900],[1850,1100]],geoData)
  ;

  let pathMaker = d3.geoPath(projection);

  viz.selectAll(".regions").data(geoData.features).enter()
    .append("path")
      .attr("class", "regions")
      .attr("d", pathMaker)
      .attr("fill","white")
      .attr("opacity",0.5)
      .attr("display","none")

  ;

  // document.getElementById("regions").addEventListener("mouseover", function(){
  //
  //   document.getElementById("regions").style.display = "block";
  //   document.getElementById("regions").style.opacity = "0.5";
  // })
})

//map background
viz.append("svg:image")
   .attr("xlink:href","pic/chinamap.jpg")
   .attr("width",1600)
   .attr("x",000)
   .attr("y",0)
   .attr("id","bgmain")
   .attr("opacity",0)
;




//background pic at welcome page
viz.append("svg:image")
   .attr("xlink:href","pic/bg1.jpg")
   .attr("width",800)
   .attr("x",0)
   .attr("y",0)
   .attr("id","bg1")
   .attr("opacity",1)

;

viz.append("svg:image")
   .attr("xlink:href","pic/bg2.jpg")
   .attr("width",800)
   .attr("x",799)
   .attr("y",0)
   .attr("id","bg2")
   .attr("opacity",1)
;

//button at welcome page
viz.append("rect")
  .attr("x",680)
  .attr("y",600)
  .attr("width",240)
  .attr("height",80)
  .attr("id","welcomebutton")

;

document.getElementById("welcomebutton").addEventListener("click", function(){
  welcomeBgm.fade(0,3);
  enterTime = millis();
  enterMap = true;

  viz.select("#bg1")
    .transition()
    .duration(6000)
    .attr("x",-800)
    .attr("opacity",0.3)
  ;

  viz.select("#bg2")
    .transition()
    .duration(6000)
    .attr("x",1600)
    .attr("opacity",0.3)
  ;

  viz.select("#bgmain")
    .transition()
    .delay(3000)
    .duration(9000)
    .attr("opacity",0.9)
  ;

  document.getElementById("welcomebutton").remove();
});


// // IMPORT DATA
// d3.json("mainland.geojson").then(function(geoData){
//   d3.csv("china-pop-2018.csv").then(function(incomingData){
//
//     incomingData = incomingData.map(function(d,i){
//       d.population = Number(d.population);
//       return d;
//     });
//
//     let minPop = d3.min(incomingData,function(d,i){
//       return d.population;
//     });
//
//     let maxPop = d3.max(incomingData,function(d,i){
//       return d.population;
//     });
//
//     let colorScale = d3.scaleLinear().domain([minPop,maxPop]).range(["white","red"]);
//     // PRINT DATA
//     console.log(geoData);
//
//     // SCALES (to translate data values to pixel values)
//     // let xDomain = d3.extent(incomingData, function(d){ return Number(d.year); })
//     // let xScale = d3.scaleLinear().domain(xDomain).range([padding,w-padding]);
//     // let yDomain = d3.extent(incomingData, function(d){ return Number(d.birthsPerThousand); })
//     // let yScale = d3.scaleLinear().domain(yDomain).range([h-padding,padding]);
//
//    let projection = d3.geoEqualEarth()
//       //.translate([w/2,h/2])
//       //.center([103.8,34.1])
//       .fitExtent([[padding,padding],[w-padding,h-padding]],geoData)
//    ;
//
//     // PATH (line) MAKER - gets points, returns one of those complicated looking path strings
//     // let lineMaker = d3.line()
//     //     .x(function(d){
//     //       return xScale(Number(d.year));
//     //     })
//     //     .y(function(d){
//     //       return yScale(Number(d.birthsPerThousand));
//     //     })
//     // ;
//
//     let pathMaker = d3.geoPath(projection);
//
//     // CREATE SHAPES ON THE PAGE!
//     viz.selectAll(".regions").data(geoData.features).enter()
//       .append("path")
//         .attr("class", "regions")
//         .attr("d", pathMaker)
//         .attr("fill", function(d,i){
//           let check = incomingData.find(function(dp){
//             if (dp.province == d.properties.name){
//               return true;
//             }else{
//               return false;
//             }
//           });
//
//           if (check != undefined){
//             return colorScale(check.population);
//           }else{
//             return "black"
//           }
//
//         })
//         .attr("stroke", "red")
//
//     ;
//
//
//
//     //let pixelV = projection([lon,lat]);
//     let photo = viz.append("g").attr("class","photo");
//
//     photo.append("svg:image")
//     .attr("xlink:href","littlebai.png")
//     .attr("x",function(){
//       return projection([lon,lat])[0]
//     })
//     .attr("y",function(){
//       return projection([lon,lat])[1]
//     })
//     .attr("width",40);
//
//     function goGoGo(){
//
//         let x = projection([lon,lat])[0];
//         let y = projection([lon,lat])[1];
//
//
//       photo.select("image").transition().duration(1000).attr("x",x).attr("y",y);
//
//
//     }
//
//     function playSound(){
//       let s = document.getElementById("snd");
//
//       s.play();
//     }
//
//     document.getElementById("step").addEventListener("click",function(){
//
//         lon = Math.random() *30 +90;
//         lat = Math.random() *25 +20;
//         console.log(lon,lat);
//         playSound();
//         goGoGo();
//       });
//
//
// });
//
// });
