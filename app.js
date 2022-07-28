
const express = require("express");
const app = express();
const http = require("https");

const bodyParser = require("body-parser");
const { resolveSoa } = require("dns");
const e = require("express");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  var cityname = req.body.city;
  
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&units=metric&appid=9d84fad6e68bb45969390e33e0812fb5" ;

  http.get(url,function(response){
     response.on("data",function(data){

       var weaData = JSON.parse(data);
    
       var temp = weaData.main.temp;
       var desc = weaData.weather[0].description;
       
       var icon = weaData.weather[0].icon;

       var imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

       //res.header("content-type", "text/html"); 
        //  very important above for working ( this might not work:  res.write('<head><meta charset="utf-8"></head>' or else use the h1 tag in the first write statement);
         

      res.write("<h1>The temp in "+cityname+ " is : " +temp+"Degree Celcius\n</h1>");
      res.write("<h2>Weather description is : "+desc+"</h2>");
     
    
       res.write("<img src="+imageUrl+">");
       res.send();
     })
  })


})


app.listen(3000,function(req,res){
    console.log("Server running on port 3000 ");
})




// app.get("/",function(req,res){

//    const url = "https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=9d84fad6e68bb45969390e33e0812fb5" ;

//     http.get(url,function(response){

//         console.log(response.statusCode);
     
//        response.on("data",(data)=>{
//       var Wdata = JSON.parse(data)
//       const temp = Wdata.main.temp
//       const Des = Wdata.weather[0].description

//      const iconNo = Wdata.weather[0].icon

//      const imgaeurl ="https://openweathermap.org/img/wn/10n@2x.png"

//       //for sending mutiple use write then send
      
//      res.write("The Temperature in london is "+temp +" degree celcius\n");
       
//       res.write("Weather description is : "+Des+"\n");
     
//        res.write('<head><meta charset="utf-8"></head>');
//       // res.write("<img src="+imgaeurl+">");

//         res.send();


//      })
  
//     })
   
// })