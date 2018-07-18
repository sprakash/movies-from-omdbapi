//Function that runs when document is loaded.
document.addEventListener("DOMContentLoaded", function(event) { 
	
	var favfilmCount=0; //global variable keeping track of number of favs. 

	//when user clicks search thereby submitting the form
	document.getElementById('movieform').addEventListener('submit', function(evt){
    	evt.preventDefault();

    	//create ajax request to api for movie names
		var xhr = new XMLHttpRequest();
		var params = "moviename="+document.getElementById('moviename').value;
		xhr.open('GET', '/getMovieList?'+params, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		//loading response
		xhr.onload = function() {

			//element where movie results will be written
			const results = document.querySelector("#results");
  			results.innerHTML = "";

  			//if request is a success.
		    if (xhr.status === 200) {

		    	//parse the response
		    	var movieResults = JSON.parse(xhr.response);

		    	//console.log(JSON.parse(xhr.response)[0].Title);

		    	//we have at least one movie result returned.
		    	if(movieResults.length > 0){
		    		
		    		//go through all the results
		    		for (var i=0; i< movieResults.length; i++){

		    			//create proper elements that will store the result.
		    			var movieItemDiv = document.createElement('div');
		    			var movieItemDetails = document.createElement('div');

		    			//get the title of the film and write into HTML element for display
                        var titleLink = document.createElement("a"); 
                        titleLink.href = "#";
                        titleLink.innerHTML = (i+1)+". " + movieResults[i].Title;
                        
                        titleLink.addEventListener('click', function(e){
                        	e.preventDefault();
                        	this.parentElement.children[1].style.display="block";
                        });

                        //get the year of the film and write into HTML element for display.
                        var movieYear = document.createElement('div');
                        movieYear.innerHTML = "Year : " + movieResults[i].Year;

                        //get the imdbid of the film and write into HTML element for display.
                        var movieImdbID = document.createElement('div');
                        movieImdbID.innerHTML = "IMDB ID : " + movieResults[i].imdbID;

                        //get the movietype of the film and write into HTML element for display.
                        var movieType = document.createElement('div');
                        movieType.innerHTML = "Type : " +movieResults[i].Type;

                        //get the poster url of the film and write into HTML element for display.
                        var moviePoster = document.createElement('div');
                        moviePoster.innerHTML = 'Poster  <img src='+movieResults[i].Poster+'/>';

                        //create radio button to mark movie as favorite
                        var movieFav = document.createElement('input');
                        movieFav.type = 'radio';
                        movieFav.name = 'movieFave-'+i;
                        movieFav.checked = false;

                        movieFav.addEventListener('change', markAsFav, false);

                        var movieFavSpan = document.createElement('span');
                        movieFavSpan.innerHTML = 'Mark as a Favorite Movie';

                        //put all HTML elements together for display.
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
		    } else if (xhr.status === 500) { // if response has an issue
		    		results.innerHTML = "Sorry No Results For That Movie Name.";
		    }
		     else {
		     		results.innerHTML = "Sorry No Results For That Movie Name.";
		    		console.log("Sorry No Results.");
		    }
		};
		xhr.send();
	});
	
	// Event Handler for when Your Favorite Movies is clicked.
	document.getElementById("fav-link").addEventListener("click", listFavorites, false);

	//make an api call to post favorite movie data per radio button click
	function markAsFav() {
		
		favfilmCount++; //keeping track of # of fav movies.

		//format the content you want to show as fav movie. Title and Year (in case there are duplicates)
		var favfilm = this.parentElement.parentElement.children[0].innerHTML; 
		var favfilmTitle= favfilm.split(".")[1]; 

		var favfilmYear = this.parentElement.parentElement.children[1].children[0].innerHTML;//in case of duplicates, you have year to distinguish
		var setFavReq = new XMLHttpRequest();
		var setFavUrl = '/setFavorites';

		//construct a json data object that will contain favorite movies data which will be sent to api. 
		var favJSONData = JSON.stringify({"fav" : favfilmTitle+" "+favfilmYear});

		//make api call and send favorite movies data.
		setFavReq.open('POST', '/setFavorites', true);
		setFavReq.setRequestHeader('Content-Type', 'application/json');
		setFavReq.send(favJSONData);
		ocument.getElementById('favMovies').innerHTML = "";
	}

	//make an api call to list favorites, does not handle for duplicates if the film is made a favorite again by a repeated sarch.
	function listFavorites() {

		//make request to get favorited movies
		var listFavsReq = new XMLHttpRequest();
		listFavsReq.open('GET', '/favorites', true);
		listFavsReq.setRequestHeader('Content-Type', 'application/json');

		listFavsReq.onload = function() {
			if (listFavsReq.status === 200) {  //if request is success.

				//parse the returned data
				var favMovies = JSON.parse(listFavsReq.response);

				//more than one favorite film has been returned.
				if(favMovies.length > 0){

					//format the content into HTML elements to be displayed as favorite movies. Title and Year (in case of duplicates).
					var favMovieContainer = document.getElementById('favMovies');
					favMovieContainer.innerHTML = "";

		    		var favMovieList = document.createElement('ul');
		    		favMovieList.className = "favMovieList";

		    		//go through all the favorited movies
		    		for (var i=0; i< favMovies.length; i++){
						var favMovie = document.createElement('li');
			   			favMovie.innerHTML = (i+1)+". "+favMovies[i].substring(1, favMovies[i].length-1);
			   			favMovieList.appendChild(favMovie);

		    		}

		    		//render the data onto HTML element.
		    		favMovieContainer.appendChild(favMovieList);

		    	} else { //if request is not successful
		    		document.getElementById('favMovies').innerHTML = "You have not yet marked any movies as favorites. Search and mark as favorite.";
		    	}
			}
		};
		listFavsReq.send();

	}

});
