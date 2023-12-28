import express from "express";
import asyncHandler from "express-async-handler";
import {
  getMovies,
  getMovie,
  getMovieImages,
  getUpcomingMovies,
  getLatestMovies,
  getMovieReviews,
  getTrend,
  getPeople,
  getPersonDetail,
  getCredits,
  getMovieCredits,
} from "../api/tmdb-api.js";
import { handleApiResponse } from "../util/apiHandler/index.js";

const router = express.Router();
/**
 * @swagger
 * /tmdb/movies:
 *   get:
 *     summary: Retrieves a list of movies
 *     description: This endpoint retrieves a list of movies with optional pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: An array of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

router.get(
  "/movies",
  asyncHandler(async (req, res) => {
    const page = req.query.page;
    await handleApiResponse(res, getMovies, "movies", page);
  })
);
/**
 * @swagger
 * /tmdb/movie/:id:
 *   get:
 *     summary: Retrieves details of a specific movie
 *     description: This endpoint retrieves detailed information of a movie by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the movie
 *     responses:
 *       200:
 *         description: Detailed information of the movie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */

router.get("/movie/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const movie = await getMovie(id);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json({
      message: "The movie you requested could not be found.",
      status_code: 404,
    });
  }
});
/**
 * @swagger
 * /tmdb/movie/:id/images:
 *   get:
 *     summary: Retrieves images for a specific movie
 *     description: This endpoint retrieves a collection of images for a specific movie.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the movie
 *     responses:
 *       200:
 *         description: A collection of images related to the movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MovieImage'
 */

router.get("/movie/:id/images", async (req, res) => {
  const id = parseInt(req.params.id);
  const images = await getMovieImages(id);
  if (images) {
    res.status(200).json(images);
  } else {
    res.status(404).json({
      message: "The images you requested could not be found.",
      status_code: 404,
    });
  }
});
/**
 * @swagger
 * /tmdb/upcoming:
 *   get:
 *     summary: Retrieves upcoming movies
 *     description: This endpoint retrieves a list of upcoming movies.
 *     responses:
 *       200:
 *         description: An array of upcoming movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

router.get(
  "/upcoming",
  asyncHandler(async (req, res) => {
    const page = req.query.page;
    await handleApiResponse(res, getUpcomingMovies, "upcoming movies", page);
  })
);
/**
 * @swagger
 * /tmdb/trend:
 *   get:
 *     summary: Retrieves trending movies
 *     description: This endpoint retrieves a list of trending movies.
 *     responses:
 *       200:
 *         description: A list of trending movies.
 */

router.get(
  "/trend",
  asyncHandler(async (req, res) => {
    const page = req.query.page;

    await handleApiResponse(res, getTrend, "trend movies", page);
  })
);

/**
 * @swagger
 * /tmdb/now_playing:
 *   get:
 *     summary: Retrieves movies that are currently playing
 *     description: This endpoint retrieves a list of movies that are currently in theaters.
 *     responses:
 *       200:
 *         description: A list of movies currently playing in theaters.
 */

router.get(
  "/now_playing",
  asyncHandler(async (req, res) => {
    const page = req.query.page;

    await handleApiResponse(
      res,
      getLatestMovies,
      "latest movies infomation",
      page
    );
  })
);
/**
 * @swagger
 * /tmdb/movie/:id/reviews:
 *   get:
 *     summary: Retrieves reviews for a specific movie
 *     description: This endpoint retrieves reviews for a movie identified by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the movie
 *     responses:
 *       200:
 *         description: Reviews of the specified movie.
 */

router.get("/movie/:id/reviews", async (req, res) => {
  const id = parseInt(req.params.id);
  const reviews = await getMovieReviews(id);
  if (reviews) {
    res.status(200).json(reviews);
  } else {
    res.status(404).json({
      message: "The reviews you requested could not be found.",
      status_code: 404,
    });
  }
});
/**
 * @swagger
 * /tmdb/people:
 *   get:
 *     summary: Retrieves a list of people
 *     description: This endpoint retrieves a list of people in the movie industry.
 *     responses:
 *       200:
 *         description: A list of people in the movie industry.
 */

router.get(
  "/people",
  asyncHandler(async (req, res) => {
    const page = req.query.page;

    await handleApiResponse(res, getPeople, "people infomation", page);
  })
);
/**
 * @swagger
 * /tmdb/person/:id:
 *   get:
 *     summary: Retrieves details of a specific person
 *     description: This endpoint retrieves detailed information of a person by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the person
 *     responses:
 *       200:
 *         description: Detailed information of the specified person.
 */

router.get("/person/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const person = await getPersonDetail(id);
  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).json({
      message: "The person you requested could not be found.",
      status_code: 404,
    });
  }
});
/**
 * @swagger
 * /tmdb/movie/:id/credits:
 *   get:
 *     summary: Retrieves credits for a specific movie
 *     description: This endpoint retrieves the cast and crew credits for a movie identified by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the movie
 *     responses:
 *       200:
 *         description: Credits of the specified movie.
 */

router.get("/movie/:id/credits", async (req, res) => {
  const id = parseInt(req.params.id);
  const credits = await getCredits(id);
  if (credits) {
    res.status(200).json(credits);
  } else {
    res.status(404).json({
      message: "The credits you requested could not be found.",
      status_code: 404,
    });
  }
});
/**
 * @swagger
 * /tmdb/person/:id/movie_credits:
 *   get:
 *     summary: Retrieves movie credits for a specific person
 *     description: This endpoint retrieves the movie credits (roles in different movies) for a person identified by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the person
 *     responses:
 *       200:
 *         description: Movie credits of the specified person.
 */

router.get("/person/:id/movie_credits", async (req, res) => {
  const id = parseInt(req.params.id);
  const movie_credits = await getMovieCredits(id);
  if (movie_credits) {
    res.status(200).json(movie_credits);
  } else {
    res.status(404).json({
      message: "The credits you requested could not be found.",
      status_code: 404,
    });
  }
});

export default router;
