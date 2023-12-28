import userModel from "../api/users/userModel";
import users from "./users";
import dotenv from "dotenv";
import genres from "./genres";
import movieModel from "../api/movies/movieModel";
import genreModel from "../api/genres/genresModel.js";
import movies from "./movies.js";
import languages from "./languages.js";
import langModel from "../api/languages/langModel.js";

dotenv.config();

// deletes all user documents in collection and inserts test data
// deletes all user documents in collection and inserts test data
async function loadUsers() {
  console.log("load user Data");
  try {
    await userModel.deleteMany();
    await users.forEach((user) => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log("load seed data");
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

export async function loadGenres() {
  console.log("load seed data");
  console.log(genres.length);
  try {
    await genreModel.deleteMany();
    await genreModel.collection.insertMany(genres);
    console.info(`${genres.length} Genres were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load genres Data: ${err}`);
  }
}

export async function loadLang() {
  console.log("load seed data");
  console.log(languages.length);
  try {
    await langModel.deleteMany();
    await langModel.collection.insertMany(languages);
    console.info(`${languages.length} Genres were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load genres Data: ${err}`);
  }
}

if (process.env.NODE_ENV === "development") {
  loadUsers();
  loadMovies();
  loadGenres();
  loadLang();
}
