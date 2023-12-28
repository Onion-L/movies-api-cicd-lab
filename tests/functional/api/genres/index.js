import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Genres from "../../../../api/genres/genresModel";
import api from "../../../../index";
import genres from "../../../../seedData/genres";

const expect = chai.expect;
let db;

describe("Genres endpoint", () => {
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
      await Genres.deleteMany();
      await Genres.collection.insertMany(genres);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });
  describe("GET /tmdb/genres", () => {
    it("should return 200 status and a list of genres", (done) => {
      request(api)
        .get("/tmdb/genres")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(4);
          done();
        });
    });
  });
});
