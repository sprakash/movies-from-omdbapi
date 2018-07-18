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

app.get('/getMovieList', function(req,res){

  console.log("req params" + req.query);

  let moviename = req.query.moviename.trim();

  if(moviename !== '') {
   request.get("http://www.omdbapi.com/?s="+moviename+"&apikey=160ca515", (error, response, body) => {
       if(error) {
          return console.dir(error);
       } else {

              let movieList = JSON.parse(body);

              if(movieList['Response'] === 'True') {
                  res.setHeader('Content-Type', 'application/json');
                  console.log(JSON.stringify(movieList['Search']));

                  var json = JSON.stringify(movieList['Search']);
                  res.end(json);

                } else {
                  res.status(500).send({ error: "No Film with that name in OMDB Search" });

                }

        }    
    });
  } else {

    res.status(500).send({ error: "Movie Name not readable" });
    console.log("Movie Name not readable");
  }

});

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.get('favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error");
    return
  }
  
  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});


app.listen(3000, function(){
  console.log("Listening on port 3000");
});


