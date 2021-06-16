const { MongoDataSource } = require("apollo-datasource-mongodb");
const { User, validateUser } = require("../models/user");

/**
 * API for doing CRUD on User Collection in mongoDB
 */
class UserAPI extends MongoDataSource {
  /**
   * returns User Object for a given access-token.
   * Used in authentication flow
   * @param token
   * @returns {User}
   */
  async getUser(token) {
    const user = await User.findOne({ token }).select("email");
    return user;
  }

  /**
   * creates brand new user record
   *
   * [ { email: "user1@sideinc.com", token: "676cfd34-e706-4cce-87ca-97f947c43bd4" },
   *   { email: "user2@sideinc.com", token: "2f403433-ba0b-4ce9-be02-d1cf4ad6f453", } ]
   * @param userArr
   * @returns {[User]}
   */
  async createUser(userArr) {
    userArr.forEach((user) => {
      const validationResult = validateUser(user);
      if (validationResult.error) throw new Error(validationResult.error);
    });
    const res = await User.insertMany(userArr);
    return res;
  }
}

module.exports = UserAPI;
