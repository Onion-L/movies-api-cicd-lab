import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Movie from "../../../../api/movies/movieModel";
import User from "../../../../api/users/userModel";
import api from "../../../../index";
import movies from "../../../../seedData/movies";

const expect = chai.expect;
let db;
let userToken;

describe("Movies endpoint", () => {
  before(() => {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });

  beforeEach(async () => {
    try {
      await Movie.deleteMany();
      await Movie.collection.insertMany(movies);
      await User.deleteMany();
      // Register two users
      await request(api).post("/api/users?action=register").send({
        username: "user1",
        password: "test123@",
      });
      await request(api).post("/api/users?action=register").send({
        username: "user2",
        password: "test123@",
      });

      const res = await request(api)
        .post("/api/users?action=authenticate")
        .send({
          username: "user1",
          password: "test123@",
        });
      userToken = res.body.token.substring(7);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });
  describe("GET /auth/movies without TOKEN", () => {
    it("should return 500 status", () => {
      request(api)
        .get("/auth/movies")
        .set("Accept", "application/json")
        .expect(500);
    });
  });
  describe("GET /auth/movies/:id without TOKEN", () => {
    describe("when the id is valid", () => {
      it("should return 500 status", () => {
        return request(api)
          .get(`/auth/movies/${movies[0].id}`)
          .set("Accept", "application/json")
          .expect(500);
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/auth/movies/999999")
          .set("Accept", "application/json")
          .set("Authorization", `Bearer ${userToken}`)
          .expect(404)
          .expect({
            status_code: 404,
            message: "The movie you requested could not be found.",
          });
      });
    });
  });

  describe("GET /auth/movies with TOKEN", () => {
    it("should return 20 movies and a status 200", (done) => {
      request(api)
        .get("/auth/movies")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
          done();
        });
    });
  });
  describe("GET /auth/movies/:id with TOKEN", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/auth/movies/${movies[0].id}`)
          .set("Accept", "application/json")
          .set("Authorization", `Bearer ${userToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", movies[0].title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/auth/movies/9999")
          .set("Accept", "application/json")
          .set("Authorization", `Bearer ${userToken}`)
          .expect(404)
          .expect({
            status_code: 404,
            message: "The movie you requested could not be found.",
          });
      });
    });
  });
});
