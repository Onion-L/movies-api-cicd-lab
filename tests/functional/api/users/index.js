import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";
import api from "../../../../index";

const expect = chai.expect;
let db;
let user1token;
let userId;

describe("Users endpoint", () => {
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
    } catch (err) {
      console.error(`failed to Load user test Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
  });
  describe("GET /api/users ", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  describe("POST /api/users ", () => {
    describe("For a register action", () => {
      describe("when the password does mot meet the requirements", () => {
        it("should return a 400 status and the error message", () => {
          return request(api)
            .post("/api/users?action=register")
            .send({
              username: "user4",
              password: "12345678",
            })
            .expect(400)
            .expect({
              success: false,
              msg: "Password does not meet the requirements",
            });
        });
      });
    });
    describe("For an authenticate action", () => {
      describe("when the password is incorrect", () => {
        it("should return a 401 status and a error message", () => {
          return request(api)
            .post("/api/users?action=authenticate")
            .send({
              username: "user1",
              password: "test1234@",
            })
            .expect(401)
            .expect({ success: false, msg: "Wrong password." });
        });
      });
      describe("when the user is unauthenticated", () => {
        it("should return a 401 status and a error message", () => {
          return request(api)
            .post("/api/users?action=authenticate")
            .send({
              username: "user4",
              password: "test1234@",
            })
            .expect(401)
            .expect({
              success: false,
              msg: "Authentication failed. User not found.",
            });
        });
      });
    });
  });
  describe("PUT /api/users ", () => {
    describe("For a update action", () => {
      describe("when the id is incorrect", () => {
        let userId = "658190b10589b4ee02c75b30";

        it("should return a 404 status and the error message", () => {
          return request(api)
            .put(`/api/users/${userId}`)
            .send({
              password: "test222@",
            })
            .expect(404)
            .expect({ code: 404, msg: "Unable to Update User" });
        });
      });
    });
  });
});
