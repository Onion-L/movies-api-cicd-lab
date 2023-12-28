import express from "express";
import User from "./userModel";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           unique: true
 *           required: true
 *           description: The unique username for the user
 *         password:
 *           type: string
 *           required: true
 *           description: The password for the user's account
 */

const validatePassword = (password) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(password);
};

const router = express.Router(); // eslint-disable-line
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Retrieves all users
 *     description: This endpoint retrieves a list of all users from the database.
 *     responses:
 *       200:
 *         description: An array of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register or authenticate a user
 *     description: This endpoint either registers a new user or authenticates an existing user, based on the query parameter.
 *     parameters:
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         description: Specify 'register' for registration or leave blank for authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User authenticated successfully.
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Authentication failed.
 */

// register(Create) User
router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      if (!req.body.username || !req.body.password) {
        return res
          .status(400)
          .json({ success: false, msg: "Username and password are required." });
      } else if (!validatePassword(req.body.password)) {
        return res.status(400).json({
          success: false,
          msg: "Password does not meet the requirements",
        });
      }
      if (req.query.action === "register") {
        await registerUser(req, res);
      } else {
        await authenticateUser(req, res);
      }
    } catch (error) {
      // Log the error and return a generic error message
      console.error(error);
      res.status(500).json({ success: false, msg: "Internal server error." });
    }
  })
);
/**
 * @swagger
 * /api/users/:id:
 *   put:
 *     summary: Update a user
 *     description: This endpoint updates the information of a user identified by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
// Update a user
router.put("/:id", async (req, res) => {
  if (req.body._id) delete req.body._id;
  const result = await User.updateOne(
    {
      _id: req.params.id,
    },
    req.body
  );
  if (result.matchedCount) {
    res.status(200).json({ code: 200, msg: "User Updated Sucessfully" });
  } else {
    res.status(404).json({ code: 404, msg: "Unable to Update User" });
  }
});

async function registerUser(req, res) {
  // Add input validation logic here
  await User.create(req.body);
  res.status(201).json({ success: true, msg: "User successfully created." });
}

async function authenticateUser(req, res) {
  const user = await User.findByUserName(req.body.username);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, msg: "Authentication failed. User not found." });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    const token = jwt.sign({ username: user.username }, process.env.SECRET);
    res.status(200).json({
      success: true,
      token: "BEARER " + token,
      userId: user._id,
      favorites: user.favorites,
    });
  } else {
    res.status(401).json({ success: false, msg: "Wrong password." });
  }
}
export default router;
