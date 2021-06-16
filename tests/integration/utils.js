const mongoose = require("mongoose");
const { User } = require("../../models/user");
const UserAPI = require("../../datasources/user-api");
const userAPI = new UserAPI(User);

const seedUsers = async function () {
  return new Promise((resolve) => {
    mongoose.connection.once("open", async function () {
      await userAPI.createUser([
        {
          email: "user1@sideinc.com",
          token: "676cfd34-e706-4cce-87ca-97f947c43bd4",
        },
        {
          email: "user2@sideinc.com",
          token: "2f403433-ba0b-4ce9-be02-d1cf4ad6f453",
        },
      ]);
      resolve();
    });
  });
};

module.exports = seedUsers;
