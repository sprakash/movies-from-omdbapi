document.addEventListener("DOMContentLoaded", function(event) { 
	console.log('laoding this');

	document.getElementById('movieform').addEventListener('submit', function(evt){
    	evt.preventDefault();
		console.log('submit now');

		var xhr = new XMLHttpRequest();
		var params = "moviename="+document.getElementById('moviename').value;

		//console.log(params);

		xhr.open('GET', '/getMovieList?'+params, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onload = function() {
		    if (xhr.status === 200) {
		    	var movieResults = JSON.parse(xhr.response);

		    	//console.log(JSON.parse(xhr.response)[0].Title);

		    	if(movieResults.length > 0){
		    		const results = document.querySelector("#results");
  
		    		for (var i=0; i< movieResults.length; i++){

		    			var movieItemDiv = document.createElement('div');

                        var titleLink = document.createElement("a"); 
                        titleLink.href = "#";
                        titleLink.innerHTML = movieResults[i].Title;

                        var movieYear = document.createElement('div');
                        movieYear.innerHTML = movieResults[i].Year;

                        var movieImdbID = document.createElement('div');
                        movieImdbID.innerHTML = movieResults[i].imdbID;

                        var movieType = document.createElement('div');
                        movieType.innerHTML = movieResults[i].Type;

                        var moviePoster = document.createElement('div');
                        moviePoster.innerHTML = movieResults[i].Poster;

                        var movieFav = document.createElement('input');
                        movieFav.type = 'checkbox';
                        movieFav.name = 'movieFave';
                        movieFav.checked = false;

                        var movieFavSpan = document.createElement('span');
                        movieFavSpan.innerHTML = 'Mark as a Favorite Movie';

                        movieItemDiv.id =  "movie-"+i;
                        movieItemDiv.appendChild(titleLink);
                        movieItemDiv.appendChild(movieYear);
                        movieItemDiv.appendChild(movieImdbID);
                        movieItemDiv.appendChild(movieType);
                        movieItemDiv.appendChild(moviePoster);
                        movieItemDiv.appendChild(movieFav);
                        movieItemDiv.appendChild(movieFavSpan);

                        results.appendChild(movieItemDiv);

                            
                 	 }   




                    //res.write('<a style="display:block;padding-top:2em;" class="allfavs" href="/favorites">View All Favorites</a>');
		    	}
		    } else {
		    	console.log("didn't find what you were looking for");
		    }
		};
		xhr.send();
	});
	
});
