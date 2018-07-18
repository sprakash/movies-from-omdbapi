document.addEventListener("DOMContentLoaded", function(event) { 
	var favfilmCount=0;

	document.getElementById('movieform').addEventListener('submit', function(evt){
    	evt.preventDefault();
		console.log('submit now');

		var xhr = new XMLHttpRequest();
		var params = "moviename="+document.getElementById('moviename').value;
		xhr.open('GET', '/getMovieList?'+params, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onload = function() {
			const results = document.querySelector("#results");
  			results.innerHTML = "";

		    if (xhr.status === 200) {
		    	var movieResults = JSON.parse(xhr.response);

		    	//console.log(JSON.parse(xhr.response)[0].Title);

		    	if(movieResults.length > 0){
		    		
		    		for (var i=0; i< movieResults.length; i++){

		    			var movieItemDiv = document.createElement('div');
		    			var movieItemDetails = document.createElement('div');

                        var titleLink = document.createElement("a"); 
                        titleLink.href = "#";
                        titleLink.innerHTML = (i+1)+". " + movieResults[i].Title;
                        
                        titleLink.addEventListener('click', function(e){
                        	e.preventDefault();
                        	this.parentElement.children[1].style.display="block";
                        });

                        var movieYear = document.createElement('div');
                        movieYear.innerHTML = "Year : " + movieResults[i].Year;

                        var movieImdbID = document.createElement('div');
                        movieImdbID.innerHTML = "IMDB ID : " + movieResults[i].imdbID;

                        var movieType = document.createElement('div');
                        movieType.innerHTML = "Type : " +movieResults[i].Type;

                        var moviePoster = document.createElement('div');
                        moviePoster.innerHTML = 'Poster  <img src='+movieResults[i].Poster+'/>';

                        var movieFav = document.createElement('input');
                        movieFav.type = 'checkbox';
                        movieFav.name = 'movieFave';
                        movieFav.checked = false;

                        movieFav.addEventListener('change', markAsFav, false);

                        var movieFavSpan = document.createElement('span');
                        movieFavSpan.innerHTML = 'Mark as a Favorite Movie';

                       
		    			movieItemDetails.className = "movie-item-details";
                        movieItemDetails.appendChild(movieYear);
                        movieItemDetails.appendChild(movieImdbID);
                        movieItemDetails.appendChild(movieType);
                        movieItemDetails.appendChild(moviePoster);
                        movieItemDetails.appendChild(movieFav);
                        movieItemDetails.appendChild(movieFavSpan);

                        movieItemDiv.id =  "movie-"+i;
                        movieItemDiv.className = "movie-item";
                        movieItemDiv.appendChild(titleLink);

                        movieItemDiv.appendChild(movieItemDetails);

                        results.appendChild(movieItemDiv);
                            
                 	 }   
		    	}
		    } else if (xhr.status === 500) {
		    		results.innerHTML = "Sorry No Results For That Movie Name";
		    }
		     else {
		     		results.innerHTML = "Sorry No Results For That Movie Name";
		    		console.log("Sorry No Results");
		    }
		};
		xhr.send();
	});

	document.getElementById("fav-link").addEventListener("click", listFavorites, false);

	function markAsFav() {
		favfilmCount++;
		var favfilm = this.parentElement.parentElement.children[0].innerHTML;
		var favfilmTitle= favfilm.split(".")[1];

		var favfilmYear = this.parentElement.parentElement.children[1].children[0].innerHTML;//in case of duplicates, you have year to distinguish
		var setFavReq = new XMLHttpRequest();
		var setFavUrl = '/setFavorites';

		console.log(favfilmTitle + "json");
		var favJSONData = JSON.stringify({"fav": favfilmCount+".  "+favfilmTitle+" "+favfilmYear});

		setFavReq.open('POST', '/setFavorites', true);
		setFavReq.setRequestHeader('Content-Type', 'application/json');
		setFavReq.send(favJSONData);
	}

	function listFavorites() {
		var listFavsReq = new XMLHttpRequest();
		listFavsReq.open('GET', '/favorites', true);
		listFavsReq.setRequestHeader('Content-Type', 'application/json');

		listFavsReq.onload = function() {
			if (listFavsReq.status === 200) { 

				var favMovies = JSON.parse(listFavsReq.response);
				if(favMovies.length > 0){

		    		var favMovieList = document.createElement('ul');
		    		favMovieList.innerHTML = "";
		    		for (var i=0; i< favMovies.length; i++){
						var favMovie = document.createElement('li');
			   			favMovie.innerHTML = JSON.stringify(favMovies[i]);
			   			favMovieList.appendChild(favMovie);

		    		}

		    		document.getElementById('favMovies').appendChild(favMovieList);
		    	}
			}
		};
		listFavsReq.send();

	}

});
