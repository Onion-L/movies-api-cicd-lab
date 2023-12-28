import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import moviesRouter from "./api/movies";
import usersRouter from "./api/users";
import actorRouter from "./api/actors/index";
import genreRouter from "./api/genres/index";
import langRouter from "./api/languages/index";
import tmdbMoviesRouter from "./services/movieService";
import "./db";
import "./seedData";
import authenticate from "./authenticate";
import defaultErrHandler from "./errHandler";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

dotenv.config();

const app = express();
const port = process.env.PORT;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Api",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:8080" }],
  },
  apis: ["./api/**/index.js", "./services/*.js"],
};

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(express.json());
app.use("/auth/movies", authenticate, moviesRouter);
app.use("/api/users", usersRouter);
app.use("/api/actors", actorRouter);
app.use("/tmdb/genres", genreRouter);
app.use("/tmdb/languages", langRouter);
app.use("/tmdb", tmdbMoviesRouter);

app.use(defaultErrHandler);

let server = app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

module.exports = server;
