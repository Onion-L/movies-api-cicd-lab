import { expect } from "chai";
import nock from "nock";
import { getUpcomingMovies, getGenres } from "../../../../api/tmdb-api";

describe("TMDB API tests", () => {
  beforeEach(() => {
    nock("https://api.themoviedb.org")
      .get("/3/movie/upcoming")
      .query(true)
      .reply(200, { movies: [] });

    nock("https://api.themoviedb.org")
      .get("/3/genre/movie/list")
      .query(true)
      .reply(200, { genres: [] });
  });

  it("getUpcomingMovies should return movies", async () => {
    const data = await getUpcomingMovies();
    expect(data).to.have.property("movies");
  });

  it("getGenres should return genres", async () => {
    const data = await getGenres();
    expect(data).to.have.property("genres");
  });
});
