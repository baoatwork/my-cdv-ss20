let viz = d3.select("#container")
  .append("svg")
    .attr("id","viz")
    .attr("width",5000)
    .attr("height",1000)
;

viz.append("svg:image")
   .attr("xlink:href","resource/paperreverse.png")
   .attr("width",1200)
   .attr("x",0)
   .attr("y",0)

;

viz.append("svg:image")
   .attr("xlink:href","resource/yinyangfish.png")
   .attr("width",400)
   .attr("x",400)
   .attr("y",150)

;

viz.append("text")
   .text("上 · 善")
   .attr("x",850)
   .attr("y",380)
   .attr("font-family",'Liu Jian Mao Cao')
   .attr("font-size",70)

;

viz.append("text")
   .text("Source of Life")
   .attr("x",50)
   .attr("y",380)
   .attr("font-family",'Liu Jian Mao Cao')
   .attr("font-size",60)

;

viz.append("text")
   .text("Drinking Records for One Week")
   .attr("x",390)
   .attr("y",580)
   .attr("font-family",'Bellota')
   .attr("font-size",30)

;

viz.append("text")
   .text("-- B.A.O. --")
   .attr("x",530)
   .attr("y",630)
   .attr("font-family",'Bellota')
   .attr("font-size",30)

;
