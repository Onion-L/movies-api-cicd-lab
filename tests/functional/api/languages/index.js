import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Lang from "../../../../api/languages/langModel";
import api from "../../../../index";
import languages from "../../../../seedData/languages";

const expect = chai.expect;
let db;

describe("Languages endpoint", () => {
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
      await Lang.deleteMany();
      await Lang.collection.insertMany(languages);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });
  describe("GET /tmdb/languages", () => {
    it("should return 200 status and a list of languages", (done) => {
      request(api)
        .get("/tmdb/languages")
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
