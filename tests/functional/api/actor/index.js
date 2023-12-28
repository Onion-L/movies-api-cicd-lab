import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Actor from "../../../../api/actors/actorModel";
import api from "../../../../index";
import actors from "../../../../seedData/actors";

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
      await Actor.deleteMany();
      await Actor.collection.insertMany(actors);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });
  describe("GET /api/actors", () => {
    it("should return 200 status and a list of actors", (done) => {
      request(api)
        .get("/api/actors")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          done();
        });
    });
  });
});
