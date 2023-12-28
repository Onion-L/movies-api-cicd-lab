import LangModel from "./langModel";
import asyncHandler from "express-async-handler";
import express from "express";

/**
 * @swagger
 * components:
 *   schemas:
 *     Language:
 *       type: object
 *       required:
 *         - iso_639_1
 *         - english_name
 *         - name
 *       properties:
 *         iso_639_1:
 *           type: string
 *           description: ISO 639-1 code for the language
 *         english_name:
 *           type: string
 *           description: The English name of the language
 *         name:
 *           type: string
 *           description: The native name of the language
 */

/**
 * @swagger
 * /tmdb/languages:
 *   get:
 *     summary: Retrieves a list of languages
 *     description: This endpoint retrieves all languages from the database.
 *     responses:
 *       200:
 *         description: A list of languages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 *       404:
 *         description: The languages you requested could not be found.
 */

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const languages = await LangModel.find();
    if (languages) {
      res.status(200).json(languages);
    } else {
      res.status(404).json({
        message: "The languages you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

export default router;
