import movieModel from "./movieModel";
import asyncHandler from "express-async-handler";
import express from "express";

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         adult:
 *           type: boolean
 *           description: Indicates if the movie is for adults
 *         id:
 *           type: number
 *           description: The unique identifier for the movie
 *         poster_path:
 *           type: string
 *           description: Path to the movie's poster image
 *         overview:
 *           type: string
 *           description: A brief overview of the movie
 *         release_date:
 *           type: string
 *           description: The release date of the movie
 *         original_title:
 *           type: string
 *           description: The original title of the movie
 *         genre_ids:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of genre IDs associated with the movie
 *         original_language:
 *           type: string
 *           description: The original language of the movie
 *         title:
 *           type: string
 *           description: The title of the movie
 *         backdrop_path:
 *           type: string
 *           description: Path to the movie's backdrop image
 *         popularity:
 *           type: number
 *           description: Popularity score of the movie
 *         vote_count:
 *           type: number
 *           description: Number of votes the movie received
 *         video:
 *           type: boolean
 *           description: Indicates if the entry is a video
 *         vote_average:
 *           type: number
 *           description: Average vote score of the movie
 *         production_countries:
 *           type: array
 *           description: List of countries where the movie was produced
 *           items:
 *             type: object
 *             properties:
 *               iso_3166_1:
 *                 type: string
 *                 description: ISO 3166-1 code of the country
 *               name:
 *                 type: string
 *                 description: Name of the country
 *         runtime:
 *           type: number
 *           description: Runtime of the movie in minutes
 *         spoken_languages:
 *           type: array
 *           description: Languages spoken in the movie
 *           items:
 *             type: object
 *             properties:
 *               iso_639_1:
 *                 type: string
 *                 description: ISO 639-1 code of the language
 *               name:
 *                 type: string
 *                 description: Name of the language
 *         status:
 *           type: string
 *           description: The current status of the movie (e.g., Released, In Production)
 *         tagline:
 *           type: string
 *           description: Tagline of the movie
 */

const router = express.Router();

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Retrieves a paginated list of movies
 *     description: Returns a list of movies with pagination. Default limit is 10 movies per page.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number of the movies list
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of movies per page
 *     responses:
 *       200:
 *         description: A paginated list of movies
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MovieList'
 */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    let { page = 1, limit = 20 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
      movieModel.estimatedDocumentCount(),
      movieModel
        .find()
        .limit(limit)
        .skip((page - 1) * limit),
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page)

    //construct return Object and insert into response object
    const returnObject = {
      page,
      total_pages,
      total_results,
      results,
    };
    res.status(200).json(returnObject);
  })
);
/**
 * @swagger
 * /api/movies/:id:
 *   get:
 *     summary: Retrieves details of a specific movie
 *     description: Returns the details of a movie based on the movie ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the movie
 *     responses:
 *       200:
 *         description: Details of the specified movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: The movie with the specified ID was not found
 */

// Get movie details
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({
        message: "The movie you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

export default router;
