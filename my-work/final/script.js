
let w = 1600;
let h = 800;
let padding = 20;

let lat =31.22773;
let lon = 121.53946;

let enterMap =false;
let enterTime;
let playOnce = false;

let smallMap = false;

let south = ["Jiangxi","Fujian","Guangdong","Hunan","Guangxi","Guizhou"];

//preload
function preload(){
  welcomeBgm = loadSound("sound/welcome.mp3");
  mainBgm1 = loadSound("sound/main1.mp3");
  mainBgm2 = loadSound("sound/main2.mp3");

  turnpage = loadSound("sound/turnpage.mp3");
  press = loadSound("sound/press.mp3");
  swish = loadSound("sound/swish.mp3");
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
  d3.json("places.json").then(function(incomingData){
    console.log(geoData);

    let projection = d3.geoPatterson()
       .fitExtent([[-850,-900],[1850,1100]],geoData)
    ;

    // let projectionEast = d3.geoPatterson()
    //    .fitExtent([[-2500,-1400],[3000,2600]],geoData)
    // ;


    let pathMaker = d3.geoPath(projection);
    // let pathMakerEast = d3.geoPath(projectionEast);

    let transEast = d3.transform()
      .translate([-800,-200])
      .scale(1.5)
    ;
    let transCentral = d3.transform()
      .translate([-400,-240])
      .scale(1.3)
    ;
    let transWest = d3.transform()
      .translate([0,-240])
      .scale(1.5)
    ;
    let transNorth = d3.transform()
      .translate([-450,0])
      .scale(1.5)
    ;

    let appearScroll = d3.transform()
      .translate([1100,-50])
    ;

    let myMap = viz.append("g").attr("class","mymap").attr("display","none");
    let myPlace = viz.append("g").attr("class","places");

    //hover different regions
    function overRegion(d,i){
      let check =d.properties;
      console.log(check.name,check.region);

      if(check.region != "Northwest China"){
        mapPath.filter(function(dp){
          let checkdp = dp.properties;
          if(checkdp.region == check.region){
            return true;
          }else{
            return false;
          }
        }).transition()
        .attr("opacity",0.5)
        .attr("cursor","pointer")

      ;

      viz.select("#infotitle").transition().text(check.region);
      viz.select("#infotext").transition().text(function(){
        if(check.region == "South Central China"){
          return "中部";
        }else if(check.region == "East China"){
          return "东部";
        }else if(check.region == "Southwest China"){
          return "西南";
        }else if(check.region == "North China"){
          return "北方";
        }
      });
      }


    }

    //click different regions
    function intoDetail(d,i){
      if(!smallMap){

        let check =d.properties;
        if(check.region == "East China"){
          swish.play();
          viz.select("#bgmain")
            .transition()
            .duration(1000)
            .attr("width",2400)
            .attr("height",1200)
            .attr("x",-800)
            .attr("y",-200)
          ;

          myMap.transition().duration(1000)
            .attr("transform",transEast)
            .attr("display","none")
          ;

          myPlace.transition().duration(1000)
            .attr("transform",transEast)
          ;

          smallMap =true;



        }else if(check.region == "South Central China"){
          swish.play();
          viz.select("#bgmain")
            .transition()
            .duration(1000)
            .attr("width",2080)
            .attr("height",1040)
            .attr("x",-400)
            .attr("y",-240)
          ;

          myMap.transition().duration(1000)
            .attr("transform",transCentral)
            .attr("display","none")
          ;

          myPlace.transition().duration(1000)
            .attr("transform",transCentral)
          ;
          smallMap =true;

        }else if(check.region == "Southwest China"){
          swish.play();
          viz.select("#bgmain")
            .transition()
            .duration(1000)
            .attr("width",2400)
            .attr("height",1200)
            .attr("x",0)
            .attr("y",-240)
          ;

          myMap.transition().duration(1000)
            .attr("transform",transWest)
            .attr("display","none")
          ;

          myPlace.transition().duration(1000)
            .attr("transform",transWest)
          ;
          smallMap =true;

        }else if(check.region == "North China"){
          swish.play();
          viz.select("#bgmain")
            .transition()
            .duration(1000)
            .attr("width",2400)
            .attr("height",1200)
            .attr("x",-450)
            .attr("y",0)
          ;

          myMap.transition().duration(1000)
            .attr("transform",transNorth)
            .attr("display","none")
          ;

          myPlace.transition().duration(1000)
            .attr("transform",transNorth)
          ;
          smallMap =true;

        }



      placeButtons.filter(function(dp){
        if(check.region == dp.region){
          return true;
        }else{
          return false;
        }
      }).transition()
      .attr("display","block");
      }

    }


    //click city buttons
    function cityDetail(d,i){
      turnpage.play();
      viz.select(".scroll").transition().duration(1000).attr("transform",appearScroll);
      myScroll.select("#scrolltitlechi").text(d.placeschi);
      myScroll.select("#scrolltitleeng").text(d.place);
    }


    let mapPath = myMap.selectAll(".regions").data(geoData.features).enter()
      .append("path")
        .attr("class", "regions")
        .attr("d", pathMaker)
        .attr("fill","rgb(250,220,200)")
        .attr("opacity",0)
        .on("mouseover",overRegion)
        .on("mouseout",function(){
          mapPath.transition().attr("opacity",0);
          if(!smallMap){
            viz.select("#infotitle").transition().text("Big Map");
            viz.select("#infotext").transition().text("大地图");
          }

        })
        .on("click",intoDetail)

    ;

    let placeButtons = myPlace.selectAll(".city").data(incomingData).enter()
       .append("svg:image")
       .attr("xlink:href","pic/dotdark.png")
       .attr("width",40)
       .attr("height",40)
       .attr("x",function(d,i){
         let x= projection([d.lon,d.lat])[0];
         return x -25;
       })
       .attr("y",function(d,i){
         let y = projection([d.lon,d.lat])[1];
         return y-25;
       })
       .attr("class","city")
       .attr("display","none")
       .attr("opacity",1)
       .on("mouseover",function(d,i){
         d3.select(this).attr("xlink:href","pic/dot.png");
         console.log(1);
         viz.select("#infotitle").transition().text(function(){
           return d.place;
         });
         viz.select("#infotext").transition().text(function(){
           return d.placeschi;
         });
       })
       .on("mouseout",function(d,i){
         placeButtons.attr("xlink:href","pic/dotdark.png");
         viz.select("#infotitle").transition().text(function(){
           return d.region;
         });
         viz.select("#infotext").transition().text(function(){
           if(d.region == "South Central China"){
             return "中部";
           }else if(d.region == "East China"){
             return "东部";
           }else if(d.region == "Southwest China"){
             return "西南";
           }else if(d.region == "North China"){
             return "北方";
           }
         });
       })
       .on("click",cityDetail)

    ;
    });
  })



  //map background
  viz.append("svg:image")
     .attr("xlink:href","pic/chinamap.jpg")
     .attr("width",1600)
     .attr("height",800)
     .attr("x",0)
     .attr("y",0)
     .attr("id","bgmain")
     .attr("opacity",0)
  ;

  //city details
  let myScroll = viz.append("g").attr("class","scroll").attr("transform","translate(1100 -950)");

  myScroll.append("svg:image")
     .attr("xlink:href","pic/scroll.png")
     .attr("width",500)
     .attr("x",0)
     .attr("y",0)
     .attr("id","mainscroll")

  ;

  myScroll.append("text")
     .text("heihei")
     .attr("x",250)
     .attr("y",280)
     .attr("font-family",'Baloo Bhaina 2')
     .attr("font-size",45)
     .attr("text-anchor","middle")
     .attr("id","scrolltitleeng")

  ;

  myScroll.append("text")
     .text("嘿嘿")
     .attr("x",250)
     .attr("y",230)
     .attr("font-family",'Ma Shan Zheng')
     .attr("font-size",60)
     .attr("text-anchor","middle")
     .attr("id","scrolltitlechi")
  ;

  //current information
  viz.append("rect")
    .attr("x",0)
    .attr("y",30)
    .attr("width",400)
    .attr("height",150)
    .attr("id","inforect")
    .attr("opacity",0)
    .attr("rx",10)
    .attr("ry",10)

  ;

  viz.append("text")
     .text("Big Map")
     .attr("x",20)
     .attr("y",90)
     .attr("fill","rgb(220,220,220)")
     .attr("font-family",'Baloo Bhaina 2')
     .attr("font-size",35)
     .attr("id","infotitle")
     .attr("opacity",0)
  ;

  viz.append("text")
     .text("大地图")
     .attr("x",20)
     .attr("y",140)
     .attr("fill","rgb(220,220,220)")
     .attr("font-family",'Ma Shan Zheng')
     .attr("font-size",30)
     .attr("id","infotext")
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
  viz.append("text")
     .text("Start")
     .attr("x",735)
     .attr("y",660)
     .attr("font-family",'Caveat')
     .attr("font-size",55)
     .attr("id","buttontext")
     .attr("opacity",1)

  ;

  viz.append("rect")
    .attr("x",680)
    .attr("y",600)
    .attr("width",240)
    .attr("height",80)
    .attr("id","welcomebutton")

  ;



  viz.append("text")
     .text("Map of Songci")
     .attr("x",430)
     .attr("y",140)
     .attr("font-family",'Caveat')
     .attr("font-size",60)
     .attr("id","titleeng")

  ;

  viz.append("text")
     .text("宋词地图")
     .attr("x",860)
     .attr("y",140)
     .attr("font-family",'Ma Shan Zheng')
     .attr("font-size",60)
     .attr("id","titlechi")
  ;

  viz.append("text")
     .text("B. A. O.")
     .attr("x",740)
     .attr("y",220)
     .attr("font-family",'Baloo Bhaina 2')
     .attr("font-size",35)
     .attr("id","myname")
  ;

  // document.getElementById("welcomebutton").addEventListener("mouseover", function(){
  //   console.log(1);
  //
  //   viz.select("#buttontext")
  //     .attr("opacity",0.8)
  //   ;
  // });

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

    viz.select("#inforect")
      .transition()
      .delay(3000)
      .duration(9000)
      .attr("opacity",0.7)
    ;

    viz.select("#infotitle")
      .transition()
      .delay(3000)
      .duration(9000)
      .attr("opacity",1)
    ;
    viz.select("#infotext")
      .transition()
      .delay(3000)
      .duration(9000)
      .attr("opacity",1)
    ;

    viz.select(".mymap")
      .transition()
      .delay(10000)
      .attr("display","block")
    ;

    document.getElementById("welcomebutton").remove();
    document.getElementById("titlechi").remove();
    document.getElementById("titleeng").remove();
    document.getElementById("myname").remove();
    document.getElementById("buttontext").remove();

    press.play();


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