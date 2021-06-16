const winston = require("winston");
const express = require("express");
const app = express();
const { ApolloServer } = require("apollo-server-express");
//
const typeDefs = require("./types");
const resolvers = require("./resolvers");

// models
const { Listing } = require("./models/listing");
const { User } = require("./models/user");

// APIs
const MLSAPI = require("./datasources/mls-api");
const ListingAPI = require("./datasources/listing-api");
const UserAPI = require("./datasources/user-api");
const mlsAPI = new MLSAPI();
const userAPI = new UserAPI(User);
const listingAPI = new ListingAPI(Listing);

//
require("./startup/logging")();
require("./startup/db")();

// middleware
const auth = require("./middleware/auth");

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        mlsAPI,
        listingAPI,
        userAPI,
      };
    },
    context: async ({ req, res }) => {
      return await auth(userAPI, req, res);
    },
  });
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
}
startApolloServer();
const server = app.listen({ port: 4000 }, () => {});
winston.info(`🚀 Server ready at http://localhost:4000/graphql`);

module.exports = server;
