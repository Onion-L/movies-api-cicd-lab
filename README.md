# Assignment 2 - Agile Software Practice

Name: Xiang Li 20095236

## API endpoints

+ __Authenticate__
  + GET auth/movies/:id - Retrieves details of a specific movie by its ID.
  + GET auth/movies?page=n&limit=m - Fetches a list of movies from TMDB's Discover endpoint, starting at page n with a limit of m movies per page.
  + GET auth/movies/tmdb/upcoming - Accesses upcoming movies data from TMDB.
  +GET auth/movies/tmdb/genres - Retrieves movie genres from TMDB.
+ __Movie API__
  + GET api/movies/:id - Retrieves details of a specific movie by its ID.
  + GET api/movies?page=n&limit=m - Fetches a list of movies from TMDB's Discover endpoint, starting at page n with a limit of m movies per page.
  + GET api/movies/tmdb/upcoming - Accesses upcoming movies data from TMDB.
  + GET api/movies/tmdb/genres - Retrieves movie genres from TMDB.
+ __User__
  + GET /api/users - Retrieves all registered users.
  + POST /api/users - Depending on the query parameter (`register` or login), registers a new user or authenticates an existing one. It includes password validation.
  + PUT /api/users/:id - Updates a user's information based on their ID.

## Automated Testing

  Users endpoint
    GET /api/users
database connected to test on ac-czmm0nr-shard-00-00.rllhesx.mongodb.net
      √ should return the 2 users and a status 200 (238ms)
    POST /api/users
      For a register action
        when the password does mot meet the requirements
          √ should return a 400 status and the error message
      For an authenticate action
        when the password is incorrect
          √ should return a 401 status and a error message (286ms)
        when the user is unauthenticated
          √ should return a 401 status and a error message (235ms)
    PUT /api/users
      For a update action
        when the id is incorrect
          √ should return a 404 status and the error message (277ms)

  Movies endpoint
    GET /auth/movies without TOKEN
      √ should return 500 status
    GET /auth/movies/:id without TOKEN
      when the id is valid
        √ should return 500 status
      when the id is invalid
        √ should return the NOT found message (477ms)
    GET /auth/movies with TOKEN
      √ should return 20 movies and a status 200 (512ms)
    GET /auth/movies/:id with TOKEN
      when the id is valid
        √ should return the matching movie (533ms)
      when the id is invalid
        √ should return the NOT found message (528ms)
    GET /auth/movies/tmdb/upcoming
      √ should return upcoming movies and a status 200
    GET /auth/movies/tmdb/genres
      √ should return movie genres and a status 200

  TMDB API tests
    √ getUpcomingMovies should return movies
    √ getGenres should return genres


  15 passing (25s)

## Deployments

Staging: <https://movies-api-staging-xiang-li-fa29097a8733.herokuapp.com/api/movies>
Production: <https://movies-api-production-xiang-li-f54aaac99a53.herokuapp.com/api/movies>

## Independent Learning (if relevant)

Coveralls:<https://coveralls.io/gitlab/Onion-L/movies-api-cicd-lab>
[![Coverage Status](https://coveralls.io/repos/gitlab/Onion-L/movies-api-cicd-lab/badge.svg?branch=)](https://coveralls.io/gitlab/Onion-L/movies-api-cicd-lab?branch=main)
