import actorModel from "./actorModel";
import asyncHandler from "express-async-handler";
import express from "express";

/**
 * @swagger
 * components:
 *   schemas:
 *     Actor:
 *       type: object
 *       required:
 *         - adult
 *         - gender
 *         - id
 *         - name
 *       properties:
 *         adult:
 *           type: boolean
 *           description: Indicates if the actor is an adult
 *         gender:
 *           type: number
 *           description: The gender of the actor
 *         id:
 *           type: number
 *           description: The unique identifier for the actor
 *         known_for_department:
 *           type: string
 *           description: Department the actor is known for
 *         name:
 *           type: string
 *           description: Name of the actor
 *         original_name:
 *           type: string
 *           description: The original name of the actor
 *         popularity:
 *           type: number
 *           description: Popularity score of the actor
 *         profile_path:
 *           type: string
 *           description: Path to the actor's profile image
 *         known_for:
 *           type: array
 *           description: Array of objects the actor is known for
 *           items:
 *             type: object
 *             properties:
 *               adult:
 *                 type: boolean
 *                 description: Indicates if the item is for adults
 *               backdrop_path:
 *                 type: string
 *                 description: Backdrop path of the item
 */

/**
 * @swagger
 * /actor:
 *   get:
 *     summary: Retrieves a list of actors
 *     description: This endpoint retrieves all actors from the database.
 *     responses:
 *       200:
 *         description: A list of actors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 *       500:
 *         description: Internal server error
 */

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const actors = await actorModel.find();
    res.status(200).json(actors);
  })
);

export default router;
