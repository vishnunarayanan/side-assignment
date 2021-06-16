const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");

const UserAPI = require("../../datasources/user-api");
const { User } = require("../../models/user");
const userAPI = new UserAPI(User);

describe("user Api", () => {
  beforeAll((done) => {
    mongoose
      .connect(db)
      .then(() => done())
      .catch(function (err) {
        console.log(err);
      });
  });

  afterAll((done) => {
    async function cleanUp() {
      await User.deleteMany({});
      await mongoose.connection.close();
      done();
    }

    cleanUp();
  });

  it("should create user", async () => {
    const users = [
      {
        email: "user1@sideinc.com",
        token: "676cfd34-e706-4cce-87ca-97f947c43bd4",
      },
      {
        email: "user2@sideinc.com",
        token: "2f403433-ba0b-4ce9-be02-d1cf4ad6f453",
      },
    ];
    await userAPI.createUser(users);

    // Verify
    const count = await User.count({});
    expect(count).toBe(2);
  });

  it("should throw error for invalid user email", async () => {
    const users = [
      {
        email: "invld",
        token: "676cfd34-e706-4cce-87ca-97f947c43bd4",
      },
    ];
    const promise = userAPI.createUser(users);
    await expect(promise).rejects.toThrow(
      'ValidationError: "email" must be a valid email'
    );
  });
});
