var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var movieObjectArray = [];

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')))

//API call to get a list of movies in OMDB based on the movie name entered. 
app.get('/getMovieList', function(req,res){
  //console.log("req params" + req.query);

  let moviename = req.query.moviename.trim(); //get user entered movie name that is passed in via get query params
  if(moviename !== '') { //make sure movie name is not empty

   //actual call to OMDB api 
   request.get("http://www.omdbapi.com/?s="+moviename+"&apikey=160ca515", (error, response, body) => {
       
       if(error) {
          return console.dir(error); //handle if api call fails 
       } else {
              let movieList = JSON.parse(body); //get result and parse JSON data

              if(movieList['Response'] === 'True') {  //if there are movies that are returned

                  res.setHeader('Content-Type', 'application/json'); //write back result in JSON.
                //  console.log(JSON.stringify(movieList['Search']));
                  var json = JSON.stringify(movieList['Search']);  //send all movies returned
                  res.end(json);
                } else {
                  res.status(500).send({ error: "No Film with that name in OMDB Search" });  //in case no movies come back.
                }
        }    
    });
  } else {
    res.status(500).send({ error: "Movie Name not readable" });  //if movie name is not present or readable. 
    console.log("Movie Name not readable");
  }

});

//api call to get all favorite movies 
app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');  //read the data from a data.json file
  res.setHeader('Content-Type', 'application/json');
  res.send(data); // send back the data from the file to middleware js.
});

//api call to write favorites to json file so it is persisted
app.post('/setFavorites', function(req, res){
 // console.log(" check " + req.body.fav );
  
  if(!req.body.fav){  //if params in the request don't have favorite set.
    res.send("Error");
    return
  }
  
  var data = JSON.parse(fs.readFileSync('./data.json'));  // open json file to read

  data.push("{"+req.body.fav+ "}");  //push the data to variable
  
  fs.writeFile('./data.json', JSON.stringify(data)); //write variable to file after converting to string
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});


//Always listen on this port for this app.
app.listen(3000, function(){
  console.log("Listening on port 3000");
});


