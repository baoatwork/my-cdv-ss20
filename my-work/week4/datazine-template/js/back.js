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


//Table
viz.append("line")
    .attr("x1",100)
    .attr("y1",50)
    .attr("x2",100)
    .attr("y2",550)
    .attr("stroke","black")
    .attr("stroke-width",3)
    .attr("stroke-linecap","round")

;

viz.append("line")
    .attr("x1",300)
    .attr("y1",50)
    .attr("x2",300)
    .attr("y2",550)
    .attr("stroke","black")
    .attr("stroke-width",3)
    .attr("stroke-linecap","round")

;


viz.append("line")
    .attr("x1",500)
    .attr("y1",50)
    .attr("x2",500)
    .attr("y2",550)
    .attr("stroke","black")
    .attr("stroke-width",3)
    .attr("stroke-linecap","round")

;

viz.append("line")
    .attr("x1",700)
    .attr("y1",50)
    .attr("x2",700)
    .attr("y2",550)
    .attr("stroke","black")
    .attr("stroke-width",3)
    .attr("stroke-linecap","round")

;

viz.append("line")
    .attr("x1",900)
    .attr("y1",50)
    .attr("x2",900)
    .attr("y2",550)
    .attr("stroke","black")
    .attr("stroke-width",3)
    .attr("stroke-linecap","round")

;

viz.append("line")
    .attr("x1",50)
    .attr("y1",100)
    .attr("x2",900)
    .attr("y2",100)
    .attr("stroke","black")
    .attr("stroke-width",3)
    .attr("stroke-linecap","round")

;

viz.append("line")
    .attr("x1",50)
    .attr("y1",250)
    .attr("x2",900)
    .attr("y2",250)
    .attr("stroke","black")
    .attr("stroke-width",3)
    .attr("stroke-linecap","round")

;

viz.append("line")
    .attr("x1",50)
    .attr("y1",400)
    .attr("x2",900)
    .attr("y2",400)
    .attr("stroke","black")
    .attr("stroke-width",3)
    .attr("stroke-linecap","round")

;
viz.append("line")
    .attr("x1",50)
    .attr("y1",550)
    .attr("x2",900)
    .attr("y2",550)
    .attr("stroke","black")
    .attr("stroke-width",3)
    .attr("stroke-linecap","round")

;

//Table Description
viz.append("text")
    .text("Line 1")
    .attr("font-family",'Bellota')
    .attr("font-size",20)
    .attr("x",25)
    .attr("y",160)

;
viz.append("text")
    .text("Type")
    .attr("font-family",'Bellota')
    .attr("font-size",20)
    .attr("x",25)
    .attr("y",200)

;


viz.append("text")
    .text("Line 2")
    .attr("font-family",'Bellota')
    .attr("font-size",20)
    .attr("x",25)
    .attr("y",310)

;
viz.append("text")
    .text("Container")
    .attr("font-family",'Bellota')
    .attr("font-size",20)
    .attr("x",5)
    .attr("y",350)

;

viz.append("text")
    .text("Line 3")
    .attr("font-family",'Bellota')
    .attr("font-size",20)
    .attr("x",25)
    .attr("y",460)

;
viz.append("text")
    .text("Location")
    .attr("font-family",'Bellota')
    .attr("font-size",20)
    .attr("x",10)
    .attr("y",500)

;

viz.append("line")
    .attr("x1",160)
    .attr("y1",70)
    .attr("x2",240)
    .attr("y2",70)
    .attr("stroke","black")
    .attr("stroke-width",10)
    .attr("stroke-dasharray","80,0")

;

viz.append("line")
    .attr("x1",760)
    .attr("y1",70)
    .attr("x2",840)
    .attr("y2",70)
    .attr("stroke","black")
    .attr("stroke-width",10)
    .attr("stroke-dasharray","35,10,35")

;

viz.append("line")
    .attr("x1",360)
    .attr("y1",70)
    .attr("x2",440)
    .attr("y2",70)
    .attr("stroke","black")
    .attr("stroke-width",10)
    .attr("stroke-dasharray","45,35")

;

viz.append("line")
    .attr("x1",560)
    .attr("y1",70)
    .attr("x2",640)
    .attr("y2",70)
    .attr("stroke","black")
    .attr("stroke-width",10)
    .attr("stroke-dasharray","0,45,35")

;

//Table Details
viz.append("text")
    .text("Water")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",160)
    .attr("y",180)

;

viz.append("text")
    .text("Soup")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",365)
    .attr("y",180)

;

viz.append("text")
    .text("Yorgurt")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",550)
    .attr("y",180)

;

viz.append("text")
    .text("Milk")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",765)
    .attr("y",180)

;

viz.append("text")
    .text("Bottle")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",155)
    .attr("y",330)

;

viz.append("text")
    .text("Glass")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",360)
    .attr("y",330)

;

viz.append("text")
    .text("Bowl")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",565)
    .attr("y",330)

;

viz.append("text")
    .text("Cup")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",770)
    .attr("y",330)

;

viz.append("text")
    .text("Study Room")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",120)
    .attr("y",480)

;

viz.append("text")
    .text("Home")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",360)
    .attr("y",480)

;

viz.append("text")
    .text("Outdoors")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",535)
    .attr("y",480)

;

viz.append("text")
    .text("Canteen")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",745)
    .attr("y",480)

;

//Short Descirption
viz.append("text")
    .text("Description")
    .attr("font-family",'Liu Jian Mao Cao')
    .attr("font-size",40)
    .attr("x",530)
    .attr("y",600)

;

viz.append("text")
    .text("Inspired by Taoism and traditional Chinese painting, this project aims to visualize")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",50)
    .attr("y",650)

;

viz.append("text")
    .text("data in a creative art style. Data on drinking with different features was recorded")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",50)
    .attr("y",700)

;

viz.append("text")
    .text("in March 2020 for one week and later transformed into different graphics via d3.js.")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",50)
    .attr("y",750)

;

//legend
viz.append("circle")
    .attr("fill","#FB966E")
    .attr("cx",960)
    .attr("cy",80)
    .attr("r",20)

;

viz.append("circle")
    .attr("fill","#66BAB7")
    .attr("cx",960)
    .attr("cy",160)
    .attr("r",20)

;

viz.append("circle")
    .attr("fill","#CB4042")
    .attr("cx",960)
    .attr("cy",240)
    .attr("r",20)

;

viz.append("circle")
    .attr("fill","#1E88A8")
    .attr("cx",960)
    .attr("cy",320)
    .attr("r",20)

;

viz.append("text")
    .text("Warm")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",1000)
    .attr("y",90)

;

viz.append("text")
    .text("Cold")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",1000)
    .attr("y",170)

;

viz.append("text")
    .text("Hot")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",1000)
    .attr("y",250)

;

viz.append("text")
    .text("Icy")
    .attr("font-family",'Bellota')
    .attr("font-size",30)
    .attr("x",1000)
    .attr("y",330)

;

viz.append("text")
    .text("Reached average")
    .attr("font-family",'Bellota')
    .attr("font-size",20)
    .attr("x",1000)
    .attr("y",400)

;

viz.append("text")
    .text("cups of drinks today")
    .attr("font-family",'Bellota')
    .attr("font-size",20)
    .attr("x",1000)
    .attr("y",430)

;

viz.append("text")
    .text("Didn't Reach average")
    .attr("font-family",'Bellota')
    .attr("font-size",20)
    .attr("x",1000)
    .attr("y",480)

;

viz.append("text")
    .text("cups of drinks today")
    .attr("font-family",'Bellota')
    .attr("font-size",20)
    .attr("x",1000)
    .attr("y",510)

;

viz.append("svg:image")
    .attr("xlink:href","resource/yin.png")
    .attr("width",100)
    .attr("height",100)
    .attr("x",905)
    .attr("y",350)

 ;

 viz.append("svg:image")
     .attr("xlink:href","resource/yang.png")
     .attr("width",100)
     .attr("height",100)
     .attr("x",915)
     .attr("y",430)

  ;
