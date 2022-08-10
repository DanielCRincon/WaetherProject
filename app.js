const express = require("express");
  //se requiere el modulo express
const https = require("https");
//se requiere el modulo https para tomar datos de una url externa
const bodyParser = require("body-parser");

  const app = express();
// inicializa express

app.use(bodyParser.urlencoded({extended: true}));
//lo anterior se utiliza par capturar lo que el usuario digita en la web

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
//estoy enviando el index desde el servidor al navegador
});

app.post("/", function(req, res){
//console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey ="9a44ed1d0cbae2c342b89f3dc398cee0";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){

    //get tiene varios parametros, entre los cuales necesita la url de donde
    //va a tomar la informacion que esta definida arriba como const = url

    //console.log(response.statusCode);
  //este muestra el codigo de respuesta del server si es exitoso mostrará 200

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      //console.log(weatherData);
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      //capturo lo que necesito mostrar en mi web
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>the weather is currently " + description + "<p>");
      res.write("<h1>The temperature in " + query+" is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">")
      res.send();
    })
  })


  //res.send("Server is up and running");
});




app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
