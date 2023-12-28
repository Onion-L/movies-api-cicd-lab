import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import users from "./users";
import movies from "./movies";
import actors from "./actors";
import languages from "./languages";
import genres from "./genres";
import User from "../api/users/userModel";
import Movie from "../api/movies/movieModel";
import Actor from "../api/actors/actorModel";
import Lang from "../api/languages/langModel";
import Genre from "../api/genres/genresModel";

async function main() {
  if (process.env.NODE_ENV !== "development") {
    console.log("This script is only for the development environment.");
    return;
  }
  await mongoose.connect(process.env.MONGO_DB);
  // Drop collections
  await User.collection
    .drop()
    .catch((err) => console.log("User collection not found"));
  await Movie.collection
    .drop()
    .catch((err) => console.log("Movie collection not found"));
  await Actor.collection
    .drop()
    .catch((err) => console.log("Actor collection not found"));
  await Lang.collection
    .drop()
    .catch((err) => console.log("Language collection not found"));
  await Genre.collection
    .drop()
    .catch((err) => console.log("Genres collection not found"));
  await User.create(users);
  await Movie.create(movies);
  await Actor.create(actors);
  await Lang.create(languages);
  await Genre.create(genres);

  console.log("Database initialised");
  console.log(`${users.length} users loaded`);
  console.log(`${movies.length} movies loaded`);
  console.log(`${actors.length} actors loaded`);
  console.log(`${languages.length} languages loaded`);
  console.log(`${genres.length} genres loaded`);

  await mongoose.disconnect();
}

main();
