const { AuthenticationError } = require("apollo-server-express");

/**
 * Authorization middleware.
 * Gets the user obj from the token.
 */
module.exports = async function (userAPI, req) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const user = await userAPI.getUser(bearerToken);
    if (!user) throw new AuthenticationError("you must be logged in");
    return user;
  }
  throw new AuthenticationError("you must be logged in");
};
