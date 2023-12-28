import chai from "chai";
import request from "supertest";
import api from "../../../../index";

const expect = chai.expect;
let db;

describe("TMDB Movies endpoint", () => {
  describe("GET /tmdb/movies", () => {
    it("should return 200 status and a list of movies", (done) => {
      request(api)
        .get("/tmdb/movies?page=1")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
          done();
        });
    });
  });
  describe("GET /tmdb/movies with different page", () => {
    it("should return 200 status and a list of movies", (done) => {
      request(api)
        .get("/tmdb/movies?page=112")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
          done();
        });
    });
  });
  describe("GET /tmdb/movie/:id", () => {
    describe("when the id is valid", () => {
      it("should return 200 status and a list of movies", () => {
        request(api)
          .get("/tmdb/movie/590706")
          .set("Accept", "application/json")
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", "Jiu Jitsu");
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return Internal Server Error", () => {
        return request(api)
          .get("/tmdb/movie/999999999")
          .set("Accept", "application/json")
          .expect(404)
          .expect({
            message: "The movie you requested could not be found.",
            status_code: 404,
          });
      });
    });
  });

  describe("GET /tmdb/movie/:id/images", () => {
    describe("when the id is valid", () => {
      it("should return 200 status and a list of images", () => {
        request(api)
          .get("/tmdb/movie/590706/images")
          .set("Accept", "application/json")
          .expect(200)
          .then((res) => {
            expect(res.body.backdrops).to.be.a("array");
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return Internal Server Error", () => {
        return request(api)
          .get("/tmdb/movie/999999999/images")
          .set("Accept", "application/json")
          .expect(404)
          .expect({
            message: "The images you requested could not be found.",
            status_code: 404,
          });
      });
    });
  });
  describe("GET /tmdb/upcoming", () => {
    it("should return 200 status and a list of movies", (done) => {
      request(api)
        .get("/tmdb/upcoming")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
          done();
        });
    });
  });
  describe("GET /tmdb/trend", () => {
    it("should return 200 status and a list of movies", (done) => {
      request(api)
        .get("/tmdb/trend")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
          done();
        });
    });
  });
  describe("GET /tmdb/now_playing", () => {
    it("should return 200 status and a list of movies", (done) => {
      request(api)
        .get("/tmdb/now_playing")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
          done();
        });
    });
  });
  describe("GET /tmdb/movie/:id/reviews", () => {
    describe("when the id is valid", () => {
      it("should return 200 status and a list of reviews", () => {
        request(api)
          .get("/tmdb/movie/590706/reviews")
          .set("Accept", "application/json")
          .expect(200)
          .then((res) => {
            expect(res.body.results).to.be.a("array");
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return Internal Server Error", () => {
        return request(api)
          .get("/tmdb/movie/999999999/reviews")
          .set("Accept", "application/json")
          .expect(404)
          .expect({
            message: "The reviews you requested could not be found.",
            status_code: 404,
          });
      });
    });
  });
  describe("GET /tmdb/people", () => {
    it("should return 200 status and a list of people", (done) => {
      request(api)
        .get("/tmdb/people")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
          done();
        });
    });
  });
  describe("GET /tmdb/person/:id", () => {
    describe("when the id is valid", () => {
      it("should return 200 status", () => {
        request(api)
          .get("/tmdb/person/12799")
          .set("Accept", "application/json")
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.a("object");
            expect(res.body).to.have.property("id", "12799");
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return Internal Server Error", () => {
        return request(api)
          .get("/tmdb/person/999999999")
          .set("Accept", "application/json")
          .expect(404)
          .expect({
            message: "The person you requested could not be found.",
            status_code: 404,
          });
      });
    });
  });
  describe("GET /tmdb/movie/:id/credits", () => {
    describe("when the id is valid", () => {
      it("should return 200 status", () => {
        request(api)
          .get("/tmdb/movie/590706/credits")
          .set("Accept", "application/json")
          .expect(200)
          .then((res) => {
            expect(res.body.cast).to.be.a("array");
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return Internal Server Error", () => {
        return request(api)
          .get("/tmdb/movie/999999999/credits")
          .set("Accept", "application/json")
          .expect(404)
          .expect({
            message: "The credits you requested could not be found.",
            status_code: 404,
          });
      });
    });
  });
  describe("GET /tmdb/person/:id/movie_credits", () => {
    describe("when the id is valid", () => {
      it("should return 200 status", () => {
        request(api)
          .get("/tmdb/person/106731/movie_credits")
          .set("Accept", "application/json")
          .expect(200)
          .then((res) => {
            expect(res.body.cast).to.be.a("array");
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return Internal Server Error", () => {
        return request(api)
          .get("/tmdb/person/999999999/movie_credits")
          .set("Accept", "application/json")
          .expect(404)
          .expect({
            message: "The credits you requested could not be found.",
            status_code: 404,
          });
      });
    });
  });
});
