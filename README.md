  ![GA Logo](https://raw.github.com/generalassembly/ga-ruby-on-rails-for-devs/master/images/ga.png)
  

  #### Developer Comments 
  - Only includes Pure Javascript Solution. 
  - App uses nodemon. 

  #### Usage 
  - Simply type 'nodemon' in the app root dir on the cli. 
  - make sure you have the nodemon npm package. 
  - app listens on port 3000 : http://localhost:3000
  
  #### Answer to advantages of MVC approach.
  - Usage of data-binding and variables such as scope in Angular would cut short the need to write update functions for data. As values would change on the front end, they would persist in the backend seamlessly. This would avoid repeated calls to API.
  - Additionally usage of templating language and tools such as ejs would simplify JS code. Less code and more functionality.
  - More division of views and controller as well as advantages of routing. 


## WDI Instructor Code Challenge

### GOAL 

> Create a single page application that will utilize an external API to request movie data. The client side application will be served by a back-end which will have the ability to persist data.

#### Back-end Instructions

- Within this repo you will have noticed two folders entitled `node-backend-starter-code` and `ruby-backend-starter-code`. Each of these contains similar back-ends written in frameworks respective to their languages - Sinatra for Ruby and Express for Node.

- Please **choose one** of the back-ends before you proceed. Feel free to pick whichever language you feel more comfortable in.

- Both back-ends contain several errors that commonly made by students, so you will need to do some debugging to ensure they are working correctly.

#### Front-end Instructions

- Use Vanilla Javascript to complete.

- The page should have a form that uses the [OMDBapi](http://www.omdbapi.com/) to search for matching movies and then display the results.
 - *Example*: If a user searches for `Star Wars`, a list of every Star Wars movie will be displayed.

- When the user clicks on a search result display detailed information about that movie.
  - *Example*: If a user is viewing a list of every Star Wars movie and clicks on `Star Wars: A New Hope`, detailed information about that specific movie will be displayed.

- Users should be able to "favorite" a movie and have it persisted via the provided back-end.

- Provide a link to display favorited movies.

#### Things we are looking for

- Clear, simple code
- Explanatory comments for beginners
- Consistent Naming Conventions
- Valid HTML, CSS, and JavaScript

#### Deliverables

- Please send us back a link to a git repo with the completed code challenge. 

- Include a README.md file in your repo with a link to your application deployed on Heroku or Digital Ocean.

#### Bonus

- Rewrite the application using a JavaScript MVC library. Include a readme that explains the benefits and any additional challenges students would face learning the library
