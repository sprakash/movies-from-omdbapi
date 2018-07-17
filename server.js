var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var moviename = '';
var movieObjectArray = [];

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')))

app.post('/', function(req,res){
  moviename = req.body.moviename.trim();

  if(moviename !== '') {
    request.get("http://www.omdbapi.com/?s="+moviename+"&apikey=160ca515", (error, response, body) => {
        let movieList = JSON.parse(body);
        console.log(movieList['Response']);

            // console.log(movieList['Search'][1].Title + 'title only');

          if(movieList['Response'] === 'True') {

           for (var i=0; i<movieList['Search'].length; i++){
                  console.log(movieList['Search'][i].Title);
                  console.log('---------------------');

                  movieObjectArray.push(movieList['Search'][i]);
                      
                  //list all the titles, upon clicking these details will show. 

            }          
            console.log('movie list ' + movieObjectArray[1]);

          } else {
             console.log('OMDB Search Results are 0');
          }
         
    });
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


