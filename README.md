# Assignment 2 - Agile Software Practice

Name: Xiang Li 20095236

## API endpoints

[List the Web API's endpoints and state the purpose of each one. Indicate those that require authentication.]

 e.g.

+ GET api/movies/:id - get the details of a specific movie.
+ POST api/movies/:id/reviews (Auth) - Add a review for a movie.
+ GET api/movies?page=n&limit=m - Get m list of movies from TMDB's Discover endpoint, starting at page n and limit the list size to m.  
+ POST api/:userName/favourites (Auth) - add a movie to the named user's favourites list.
+ POST /api/users?action=action - Register or authenticate a user - set action to register or login.
+ etc
+ etc

## Automated Testing

  Users endpoint
    GET /api/users
database connected to test on ac-czmm0nr-shard-00-00.rllhesx.mongodb.net
      √ should return the 2 users and a status 200 (245ms)
    POST /api/users
      For a register action
        when the password does mot meet the requirements
          √ should return a 400 status and the error message
      For an authenticate action
        when the password is incorrect
          √ should return a 401 status and a error message (294ms)
        when the user is unauthenticated
          √ should return a 401 status and a error message (237ms)
    PUT /api/users
      For a update action
        when the id is incorrect
          √ should return a 404 status and the error message (241ms)

  Movies endpoint
    GET /api/movies without TOKEN
      √ should return 500 status
    GET /api/movies/:id without TOKEN
      when the id is valid
        √ should return 500 status
      when the id is invalid
{ username: 'user1', iat: 1703205031 }
        √ should return the NOT found message (462ms)
    GET /api/movies with TOKEN
{ username: 'user1', iat: 1703205033 }
      √ should return 20 movies and a status 200 (473ms)
    GET /api/movies/:id with TOKEN
      when the id is valid
{ username: 'user1', iat: 1703205035 }
        √ should return the matching movie (466ms)
      when the id is invalid
{ username: 'user1', iat: 1703205037 }
        √ should return the NOT found message (467ms)
    GET /api/movies/tmdb/upcoming
      √ should return upcoming movies and a status 200
    GET /api/movies/tmdb/genres
      √ should return movie genres and a status 200

  TMDB API tests
    √ getUpcomingMovies should return movies
    √ getGenres should return genres

  15 passing (24s)

## Deployments

Specify the URLs of your deployments, both staging and production, e.g.

<https://movies-api-staging-doc-9200283e0b04.herokuapp.com/api/movies>

[ I do NOT need the URL of the app on your Heroku dashboard as this is private, e.g.

<https://dashboard.heroku.com/apps/movies-api-staging-doc> ]

## Independent Learning (if relevant)

Coveralls:<https://coveralls.io/gitlab/Onion-L/movies-api-cicd-lab>
