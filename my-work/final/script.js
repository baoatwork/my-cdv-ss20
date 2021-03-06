
let w = 1600;
let h = 800;
let padding = 50;


let lat =31.22773;
let lon = 121.53946;

let enterMap =false;
let enterTime;
let playOnce = false;
let withSound = true;
let changeVolume =false;

let smallMap = false;
let showstory = false;
let showGraph = false;
let currentGraph = 1;
let gw = 1000;
let gh = 600;

let transNorm = d3.transform()
  .translate([0,0])
  .scale(1)
;
let repeatScale = d3.scaleLinear().domain([1,331]).range([20,260]);

let allRegions = ["Southwest China","South Central China","North China","East China"];
let allRegionsChi = ["西南","中南","北方","东部"]
let currentRegion = 0;

let mainBgm1;
let mainBgm2;
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
    console.log(incomingData);

    let newData = incomingData.sort(function(a,b){return b.appear-a.appear});
    let allNames = newData.map(function(d){return d.place});
    console.log(allNames);

    //x,y axis
    let xScale = d3.scaleBand()
        .domain(allNames)
        .range([padding, gw-padding*2])
        .paddingInner(0.1)
    ;

    let xAxis = d3.axisBottom(xScale)

    //xAxis.tickFormat(d=>{return newData.filter(dd=>dd.key==d).place;});

    let xAxisGroup = myGraph.append("g").classed("xAxis", true);

    xAxisGroup.call(xAxis);

    xAxisGroup.selectAll("text")
    .attr("font-size", 10)
    .attr("fill","rgb(220,220,220)")
    .attr("font-family",'ZCOOL XiaoWei')
    .attr("y", 9)
    ;

    xAxisGroup.selectAll("path")
    .attr("stroke", "rgb(220,220,220)")

    ;

    xAxisGroup.selectAll("line").remove();
    xAxisGroup.attr("transform", "translate(500,650)");

    let yMax = d3.max(newData, function(d){return d.appear});
    let yDomain = [0, yMax];
    let yScale = d3.scaleLinear().domain(yDomain).range([5, 450]);

    let elementsForPage = myGraph.selectAll(".datapoint").data(newData,function(d,i){return d.place;});
    let enteringElements = elementsForPage.enter();
    let enteringDataGroups = enteringElements.append("g").classed("datapoint", true);


    enteringDataGroups.attr("transform", function(d, i){
      let xMove = xScale(d.place) + 500;
      return "translate("+ xMove+ ",650)"
    });

    enteringDataGroups
      .append("rect")
        .attr("width", function(){
          return xScale.bandwidth();
        })
        .attr("height", function(d, i){
          return yScale(d.appear);
        })
        .attr("y", function(d,i){
          return -yScale(d.appear);
        })
        .attr("fill", function(d,i){
          let myScale = repeatScale(d.appear);
          if(myScale <= 50){
            return "#81C7D4";
          }else if(myScale >= 150){
            return "#006284";
          }else{
            return "#33A6B8";
          }
        })
        .attr("rx",5)
        .attr("ry",5)
        .on("mouseover",function(d,i){
          myGraph.select("#graphtext1").text(d.place+" "+d.placeschi);
          myGraph.select("#graphtext2").text(d.region+" "+d.regionchi);
          myGraph.select("#graphtext3").text("Occurrence 出现次数: "+d.appear);
        })
        .on("mouseout",function(d,i){
          myGraph.select("#graphtext1").text("");
          myGraph.select("#graphtext2").text("");
          myGraph.select("#graphtext3").text("");
        })
    ;

    let projection = d3.geoPatterson()
       .fitExtent([[-850,-900],[1850,1100]],geoData)
    ;




    let pathMaker = d3.geoPath(projection);


    let transEast = d3.transform()
      .translate([-800,-200])
      .scale(1.5)
    ;
    let transCentral = d3.transform()
      .translate([-600,-400])
      .scale(1.5)
    ;
    let transWest = d3.transform()
      .translate([0,-240])
      .scale(1.5)
    ;
    let transNorth = d3.transform()
      .translate([-600,0])
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
          return "中南";
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

          currentRegion = 3;

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
            .attr("width",2400)
            .attr("height",1200)
            .attr("x",-600)
            .attr("y",-400)
          ;

          currentRegion = 1;

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

          currentRegion = 0;

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
            .attr("x",-600)
            .attr("y",0)
          ;

          currentRegion = 2;

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
      myScroll.select("#scrollcontent2").text(d.name);
      myScroll.select("#scrollcontent4").transition().duration(1000)
      .attr("width",repeatScale(d.appear))
      .attr("fill",function(){
        let myScale = repeatScale(d.appear);
        if(myScale <= 50){
          return "#81C7D4";
        }else if(myScale >= 150){
          return "#006284";
        }else{
          return "#33A6B8";
        }
      })
      ;
      myScroll.select("#scrollcontent5").text(d.appear);
      myScroll.select("#scrollcontent7").text(d.first+" - - "+d.firstt);
      myScroll.select("#scrollcontent8").text(d.second+" - - "+d.secondt);
      myScroll.select("#scrollcontent9").text(d.thrid+" - - "+d.thridt);
    }

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
             return "中南";
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

    let mapPath = myMap.selectAll(".regions").data(geoData.features).enter()
      .append("path")
        .attr("class", "regions")
        .attr("d", pathMaker)
        .attr("fill","rgb(250,220,200)")
        .attr("opacity",0)
        .attr("display",function(d,i){
          let check =d.properties;
          if (check.region == "Northwest China"){
            return "none";
          }else{
            return "block";
          }
        })
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

    //graph button functions
    document.getElementById("graphbutton").addEventListener("mouseover",function(){
      viz.select("#graphbutton").transition()
        .attr("xlink:href","pic/redarrow.png")
        .attr("cursor","pointer");

    });
    document.getElementById("graphbutton").addEventListener("mouseout",function(){
      viz.select("#graphbutton").transition().attr("xlink:href","pic/whitearrow.png");
    });
    document.getElementById("graphbutton").addEventListener("click",function(){
      press.play();
      swish.play();
      console.log(newData);
      if (currentGraph == 1){
        currentGraph = 2;
        newData = incomingData.sort(function(a,b){return a.regionseq-b.regionseq});
        allNames = newData.map(function(d){return d.place});

        //x,y axis
        xScale = d3.scaleBand()
            .domain(allNames)
            .range([padding, gw-padding*2])
            .paddingInner(0.1)
        ;

        xAxis = d3.axisBottom(xScale)

        //xAxis.tickFormat(d=>{return newData.filter(dd=>dd.key==d).place;});


        xAxisGroup.transition().duration(1000).call(xAxis);

        elementsForPage = myGraph.selectAll(".datapoint").data(newData,function(d,i){return d.place;});




        elementsForPage.transition().duration(1000).attr("transform", function(d, i){
          let xMove = xScale(d.place) + 500;
          return "translate("+ xMove+ ",650)"
        });

        elementsForPage
          .selectAll("rect")
          .transition()
          .duration(1000)
            .attr("fill", function(d,i){
              let myScale = d.region;
              if(myScale == "South Central China"){
                return "#E87A90";
              }else if(myScale == "North China"){
                return "#FAD689";
              }else if(myScale == "East China"){
                return "#33A6B8";
              }else if(myScale == "Southwest China"){
                return "#86C166";
              }
            })
            .attr("rx",5)
            .attr("ry",5)
        ;

        viz.select("#graphtitle").transition().text("Sorted by Regions 按区域排序");
      }else if(currentGraph == 2){
        currentGraph = 1;
        newData = incomingData.sort(function(a,b){return b.appear-a.appear});
        allNames = newData.map(function(d){return d.place});

        //x,y axis
        xScale = d3.scaleBand()
            .domain(allNames)
            .range([padding, gw-padding*2])
            .paddingInner(0.1)
        ;

        xAxis = d3.axisBottom(xScale)

        //xAxis.tickFormat(d=>{return newData.filter(dd=>dd.key==d).place;});


        xAxisGroup.transition().duration(1000).call(xAxis);

        elementsForPage = myGraph.selectAll(".datapoint").data(newData,function(d,i){return d.place;});




        elementsForPage.transition().duration(1000).attr("transform", function(d, i){
          let xMove = xScale(d.place) + 500;
          return "translate("+ xMove+ ",650)"
        });

        elementsForPage
          .selectAll("rect")
          .transition()
          .duration(1000)
            .attr("fill", function(d,i){
              let myScale = repeatScale(d.appear);
              if(myScale <= 50){
                return "#81C7D4";
              }else if(myScale >= 150){
                return "#006284";
              }else{
                return "#33A6B8";
              }
            })
            .attr("rx",5)
            .attr("ry",5)
        ;
        viz.select("#graphtitle").transition().text("Sorted by Occurrence 按出现次数排序");
      }
    });


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
  let myScroll = viz.append("g")
  .attr("class","scroll")
  .attr("transform","translate(1100 -950)")
  ;

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
     .attr("font-family",'ZCOOL XiaoWei')
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

  myScroll.append("text")
     .text("古称 Ancient Name")
     .attr("x",100)
     .attr("y",325)
     .attr("font-family",'Ma Shan Zheng')
     .attr("font-size",25)
     .attr("id","scrollcontent1")
  ;

  myScroll.append("text")
     .text("喵喵")
     .attr("x",250)
     .attr("y",370)
     .attr("font-family",'ZCOOL XiaoWei')
     .attr("font-size",35)
     .attr("text-anchor","middle")
     .attr("id","scrollcontent2")
  ;

  myScroll.append("text")
     .text("出现次数 Occurrence")
     .attr("x",100)
     .attr("y",410)
     .attr("font-family",'Ma Shan Zheng')
     .attr("font-size",25)
     .attr("id","scrollcontent3")
  ;

  myScroll.append("rect")
    .attr("x",120)
    .attr("y",430)
    .attr("width",260)
    .attr("fill","#81C7D4")
    .attr("height",30)
    .attr("id","scrollcontent4")
    .attr("rx",5)
    .attr("ry",5)
  ;

  myScroll.append("text")
     .text("7")
     .attr("x",250)
     .attr("y",455)
     .attr("font-family",'ZCOOL XiaoWei')
     .attr("font-size",30)
     .attr("text-anchor","middle")
     .attr("id","scrollcontent5")
  ;

  myScroll.append("text")
     .text("诗人 Poets")
     .attr("x",100)
     .attr("y",510)
     .attr("font-family",'Ma Shan Zheng')
     .attr("font-size",25)
     .attr("id","scrollcontent6")
  ;

  myScroll.append("text")
     .text("包包大人")
     .attr("x",250)
     .attr("y",560)
     .attr("font-family",'ZCOOL XiaoWei')
     .attr("font-size",30)
     .attr("text-anchor","middle")
     .attr("id","scrollcontent7")
  ;

  myScroll.append("text")
     .text("包包大人")
     .attr("x",250)
     .attr("y",620)
     .attr("font-family",'ZCOOL XiaoWei')
     .attr("font-size",30)
     .attr("text-anchor","middle")
     .attr("id","scrollcontent8")
  ;

  myScroll.append("text")
     .text("包包大人")
     .attr("x",250)
     .attr("y",680)
     .attr("font-family",'ZCOOL XiaoWei')
     .attr("font-size",30)
     .attr("text-anchor","middle")
     .attr("id","scrollcontent9")
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

  //menu
  viz.append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width",400)
    .attr("fill","#724938")
    .attr("height",30)
    .attr("id","menu")
    .attr("opacity",0)
    .attr("rx",10)
    .attr("ry",10)

  ;

  viz.append("svg:image")
     .attr("xlink:href","pic/whitehome.png")
     .attr("width",25)
     .attr("x",30)
     .attr("y",2)
     .attr("id","menuicon1")
     .attr("opacity",0)

  ;

  viz.append("svg:image")
     .attr("xlink:href","pic/whitebook.png")
     .attr("width",25)
     .attr("x",100)
     .attr("y",2)
     .attr("id","menuicon2")
     .attr("opacity",0)

  ;

  viz.append("svg:image")
     .attr("xlink:href","pic/whiteglobe.png")
     .attr("width",25)
     .attr("x",310)
     .attr("y",2)
     .attr("id","menuicon3")
     .attr("opacity",0)

  ;

  viz.append("svg:image")
     .attr("xlink:href","pic/whitegraph.png")
     .attr("width",25)
     .attr("x",170)
     .attr("y",2)
     .attr("id","menuicon4")
     .attr("opacity",0)

  ;

  viz.append("svg:image")
     .attr("xlink:href","pic/whitesound.png")
     .attr("width",30)
     .attr("x",240)
     .attr("y",0)
     .attr("id","menuicon5")
     .attr("opacity",0)

  ;

  //Graph
  let myGraph = viz.append("g")
    .attr("class","count")
    .attr("display","none");

  myGraph.append("rect")
    .attr("x",500)
    .attr("y",100)
    .attr("width",1000)
    .attr("height",600)
    .attr("id","graphbox")
    .attr("opacity",0.7)

  ;

  myGraph.append("svg:image")
     .attr("xlink:href","pic/whitearrow.png")
     .attr("width",60)
     .attr("x",1400)
     .attr("y",130)
     .attr("id","graphbutton")
  ;

     myGraph.append("text")
        .text("Sorted by Occurrence 按出现次数排序")
        .attr("x",1000)
        .attr("fill","rgb(220,220,220)")
        .attr("y",170)
        .attr("font-family",'ZCOOL XiaoWei')
        .attr("font-size",30)
        .attr("text-anchor","middle")
        .attr("id","graphtitle")
      ;


  myGraph.append("text")
     .text("")
     .attr("x",1270)
     .attr("fill","rgb(220,220,220)")
     .attr("y",240)
     .attr("font-family",'ZCOOL XiaoWei')
     .attr("font-size",18)
     .attr("id","graphtext1")

  ;

  myGraph.append("text")
     .text("")
     .attr("x",1270)
     .attr("fill","rgb(220,220,220)")
     .attr("y",270)
     .attr("font-family",'ZCOOL XiaoWei')
     .attr("font-size",18)
     .attr("id","graphtext2")

  ;

  myGraph.append("text")
     .text("")
     .attr("x",1270)
     .attr("fill","rgb(220,220,220)")
     .attr("y",300)
     .attr("font-family",'ZCOOL XiaoWei')
     .attr("font-size",18)
     .attr("id","graphtext3")

  ;




  //story
  let myStory = viz.append("g")
    .attr("class","story")
    .attr("display","none");

  myStory.append("rect")
    .attr("x",0)
    .attr("y",300)
    .attr("width",1600)
    .attr("height",250)
    .attr("id","storybox")
    .attr("opacity",0.7)

  ;

  myStory.append("text")
     .text("Welcome to Map of Songci! You can check out different places in China during Song dynasty (860-1279 AC) on this map.")
     .attr("x",800)
     .attr("fill","rgb(220,220,220)")
     .attr("y",330)
     .attr("font-family",'ZCOOL XiaoWei')
     .attr("font-size",20)
     .attr("text-anchor","middle")
     .attr("id","storyeng1")

  ;

  myStory.append("text")
     .text("You can also explore their connection with the Chinese poetry Songci here. Enjoy your trip into the history!")
     .attr("x",800)
     .attr("fill","rgb(220,220,220)")
     .attr("y",370)
     .attr("font-family",'ZCOOL XiaoWei')
     .attr("font-size",20)
     .attr("text-anchor","middle")
     .attr("id","storyeng2")
   ;

   myStory.append("text")
      .text("(Tip: If the map is too large for your window, please [press ctrl/command and scroll your mouse wheel to resize it] or [click F11 to view it in full screen].)")
      .attr("x",800)
      .attr("fill","rgb(220,220,220)")
      .attr("y",410)
      .attr("font-family",'ZCOOL XiaoWei')
      .attr("font-size",20)
      .attr("text-anchor","middle")
      .attr("id","storyeng3")
    ;

    myStory.append("text")
       .text("欢迎使用宋词地图！你可以在这张地图上探索中国在宋朝时 (公元960至1279年) 的不同区域和地点。")
       .attr("x",800)
       .attr("fill","rgb(220,220,220)")
       .attr("y",450)
       .attr("font-family",'ZCOOL XiaoWei')
       .attr("font-size",20)
       .attr("text-anchor","middle")
       .attr("id","storychi1")
     ;

    myStory.append("text")
        .text("同时你也可以进一步了解城市和宋词之间的联系。享受你的历史之旅吧！")
        .attr("x",800)
        .attr("fill","rgb(220,220,220)")
        .attr("y",490)
        .attr("font-family",'ZCOOL XiaoWei')
        .attr("font-size",20)
        .attr("text-anchor","middle")
        .attr("id","storychi2")
    ;

    myStory.append("text")
        .text("(提示： 如果页面太大，请摁住ctrl/command键并滑动鼠标滚轮来调整地图大小，或按F11使页面全屏。)")
        .attr("x",800)
        .attr("fill","rgb(220,220,220)")
        .attr("y",530)
        .attr("font-family",'ZCOOL XiaoWei')
        .attr("font-size",20)
        .attr("text-anchor","middle")
        .attr("id","storychi3")
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



  //menu button functions
  document.getElementById("menuicon1").addEventListener("mouseover",function(){
    viz.select("#menuicon1").transition()
      .attr("xlink:href","pic/redhome.png")
      .attr("cursor","pointer");
    console.log(1);
  });
  document.getElementById("menuicon1").addEventListener("mouseout",function(){
    viz.select("#menuicon1").transition()
    .attr("xlink:href","pic/whitehome.png")
    .attr("opacity",1);
    viz.select("#inforect").transition().attr("opacity",0.7);
    viz.select("#infotitle").transition().attr("opacity",1);
    viz.select("#infotext").transition().attr("opacity",1);
  });
  document.getElementById("menuicon1").addEventListener("click",function(){
    press.play();
    if(smallMap && !showstory && !showGraph){
      smallMap =false;
      swish.play();

      viz.select("#bgmain")
        .transition()
        .duration(1000)
        .attr("width",1600)
        .attr("height",800)
        .attr("x",0)
        .attr("y",0)
      ;

      viz.select(".mymap").transition().duration(1000)
        .attr("transform",transNorm)
        .attr("display","block")
      ;

      viz.select(".places").transition().duration(1000)
        .attr("transform",transNorm)
      ;

      viz.selectAll(".city").transition().attr("display","none");

      viz.select(".scroll").transition().duration(1000).attr("transform","translate(1100 -950)");
      viz.select("#infotitle").transition().text("Big Map");
      viz.select("#infotext").transition().text("大地图");
    }
  });

  document.getElementById("menuicon2").addEventListener("mouseover",function(){
    viz.select("#menuicon2").transition()
      .attr("xlink:href","pic/redbook.png")
      .attr("cursor","pointer");

  });
  document.getElementById("menuicon2").addEventListener("mouseout",function(){
    viz.select("#menuicon2").transition().attr("xlink:href","pic/whitebook.png").attr("opacity",1);
      viz.select("#inforect").transition().attr("opacity",0.7);
      viz.select("#infotitle").transition().attr("opacity",1);
      viz.select("#infotext").transition().attr("opacity",1);
  });
  document.getElementById("menuicon2").addEventListener("click",function(){
    press.play();
    turnpage.play();
    if(!showstory && !showGraph){
      showstory = true;

      viz.select("#bgmain")
        .transition()
        .attr("opacity",0.3)
      ;

      viz.select(".mymap").transition()
        .attr("display","none")
      ;

      viz.select("#infotitle").transition().text("Introduction");
      viz.select("#infotext").transition().text("简介");

      viz.select(".places").transition()
        .attr("display","none")
      ;

      viz.select(".scroll").transition().attr("opacity",0.2);

      viz.select(".story").transition()
        .attr("display","block")
      ;
    }else if(showstory){
      showstory = false;

      if(!smallMap){
        viz.select(".mymap").transition()
          .attr("display","block")

        ;

        viz.select("#infotitle").transition().text("Big Map");
        viz.select("#infotext").transition().text("大地图");
      }else{
        viz.select("#infotitle").transition().text(allRegions[currentRegion]);
        viz.select("#infotext").transition().text(allRegionsChi[currentRegion]);
      }


      viz.select(".places").transition()
        .attr("display","block")
      ;

      viz.select(".story").transition()
        .attr("display","none")
      ;

      viz.select(".scroll").transition().attr("opacity","1");

      viz.select("#bgmain")
        .transition()
        .attr("opacity",0.9)
      ;
    }

  });


  document.getElementById("menuicon3").addEventListener("mouseover",function(){
    viz.select("#menuicon3").transition()
      .attr("xlink:href","pic/redglobe.png")
      .attr("cursor","pointer");

  });
  document.getElementById("menuicon3").addEventListener("mouseout",function(){
    viz.select("#menuicon3").transition().attr("xlink:href","pic/whiteglobe.png").attr("opacity",1);
    viz.select("#inforect").transition().attr("opacity",0.7);
    viz.select("#infotitle").transition().attr("opacity",1);
    viz.select("#infotext").transition().attr("opacity",1);
  });
  document.getElementById("menuicon3").addEventListener("click",function(){
    press.play();
    window.open("https://github.com/baoatwork/my-cdv-ss20/tree/master/my-work/final");
  });


  document.getElementById("menuicon4").addEventListener("mouseover",function(){
    viz.select("#menuicon4").transition()
      .attr("xlink:href","pic/redgraph.png")
      .attr("cursor","pointer");

  });
  document.getElementById("menuicon4").addEventListener("mouseout",function(){
    viz.select("#menuicon4").transition().attr("xlink:href","pic/whitegraph.png").attr("opacity",1);
    viz.select("#inforect").transition().attr("opacity",0.7);
    viz.select("#infotitle").transition().attr("opacity",1);
    viz.select("#infotext").transition().attr("opacity",1);
  });
  document.getElementById("menuicon4").addEventListener("click",function(){
    press.play();
    turnpage.play();
    if(!showGraph && !showstory){
      showGraph = true;

      viz.select("#bgmain")
        .transition()
        .attr("opacity",0.3)
      ;

      viz.select(".mymap").transition()
        .attr("display","none")
      ;

      viz.select("#infotitle").transition().text("Graph");
      viz.select("#infotext").transition().text("统计");

      viz.select(".places").transition()
        .attr("display","none")
      ;

      viz.select(".scroll").transition().attr("opacity",0.2);

      viz.select(".count").transition()
        .attr("display","block")
      ;
    }else if(showGraph){
      showGraph = false;

      if(!smallMap){
        viz.select(".mymap").transition()
          .attr("display","block")

        ;

        viz.select("#infotitle").transition().text("Big Map");
        viz.select("#infotext").transition().text("大地图");
      }else{
        viz.select("#infotitle").transition().text(allRegions[currentRegion]);
        viz.select("#infotext").transition().text(allRegionsChi[currentRegion]);
      }


      viz.select(".places").transition()
        .attr("display","block")
      ;

      viz.select(".count").transition()
        .attr("display","none")
      ;

      viz.select(".scroll").transition().attr("opacity","1");

      viz.select("#bgmain")
        .transition()
        .attr("opacity",0.9)
      ;
    }

  });

  document.getElementById("menuicon5").addEventListener("mouseover",function(){
    if(withSound){
      viz.select("#menuicon5").transition()
        .attr("xlink:href","pic/redsound.png")
        ;
    }else{
      viz.select("#menuicon5").transition()
        .attr("xlink:href","pic/rednosound.png")
        ;
    }


  });
  document.getElementById("menuicon5").addEventListener("mouseout",function(){
    if(withSound){
      viz.select("#menuicon5").transition()
        .attr("xlink:href","pic/whitesound.png")
        .attr("opacity",1)
        ;
    }else{
      viz.select("#menuicon5").transition()
        .attr("xlink:href","pic/whitenosound.png")
        .attr("opacity",1)
        ;
    }
    viz.select("#inforect").transition().attr("opacity",0.7);
    viz.select("#infotitle").transition().attr("opacity",1);
    viz.select("#infotext").transition().attr("opacity",1);
  });
  document.getElementById("menuicon5").addEventListener("click",function(){
    press.play();
    if(withSound){
      withSound = false;
      mainBgm1.setVolume(0);
      mainBgm2.setVolume(0);
      viz.select("#menuicon5").transition()
        .attr("xlink:href","pic/rednosound.png")
        ;

    }else{
      withSound =true;
      mainBgm1.setVolume(1);
      mainBgm2.setVolume(1);
      viz.select("#menuicon5").transition()
        .attr("xlink:href","pic/redsound.png")
        ;

      }
  });


  //introduction function
  document.getElementById("storybox").addEventListener("click",function(){
    press.play();
    turnpage.play();
    showstory = false;

    if(!smallMap){
      viz.select(".mymap").transition()
        .attr("display","block")

      ;

      viz.select("#infotitle").transition().text("Big Map");
      viz.select("#infotext").transition().text("大地图");
    }else{
      viz.select("#infotitle").transition().text(allRegions[currentRegion]);
      viz.select("#infotext").transition().text(allRegionsChi[currentRegion]);
    }

    viz.select("#bgmain")
      .transition()
      .attr("opacity",0.9)
    ;

    viz.select(".places").transition()
      .attr("display","block")
    ;

    viz.select(".scroll").transition().attr("opacity","1");
    viz.select(".story").transition()
      .attr("display","none")
    ;
  });






  // welcome page button function
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

    viz.select("#menu")
      .transition()
      .delay(3000)
      .duration(9000)
      .attr("opacity",1)
    ;
    viz.select("#menuicon1")
      .transition()
      .delay(3000)
      .duration(9000)
      .attr("opacity",1)
    ;
    viz.select("#menuicon2")
      .transition()
      .delay(3000)
      .duration(9000)
      .attr("opacity",1)
    ;
    viz.select("#menuicon3")
      .transition()
      .delay(3000)
      .duration(9000)
      .attr("opacity",1)
    ;
    viz.select("#menuicon4")
      .transition()
      .delay(3000)
      .duration(9000)
      .attr("opacity",1)
    ;
    viz.select("#menuicon5")
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
