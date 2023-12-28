import asyncHandler from "express-async-handler";
import express from "express";
import genresModel from "./genresModel";

/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: number
 *           description: The unique identifier for the genre
 *         name:
 *           type: string
 *           description: Name of the genre
 */

/**
 * @swagger
 * /tmdb/genres:
 *   get:
 *     summary: Retrieves a list of genres
 *     description: This endpoint retrieves all genres from the database.
 *     responses:
 *       200:
 *         description: A list of genres.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       404:
 *         description: The genres you requested could not be found.
 */

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const genres = await genresModel.find();
    if (genres) {
      res.status(200).json(genres);
    } else {
      res.status(404).json({
        message: "The genres you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

export default router;
