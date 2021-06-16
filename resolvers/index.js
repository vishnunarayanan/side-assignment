const index = {
  Query: {
    properties: (_, { city }, { dataSources }) => {
      return dataSources.mlsAPI.getAllListings(city);
    },
  },
  Mutation: {
    addToFavorite: async (_, { mlsId }, { dataSources }) => {
      const favoriteCount = await dataSources.listingAPI.addToFavorite(mlsId);
      const listing = await dataSources.mlsAPI.getListing(mlsId);
      listing["favoriteCount"] = favoriteCount;
      return listing;
    },
  },
  Listing: {
    favoriteCount: ({ mlsId }, __, { dataSources }) => {
      return dataSources.listingAPI.getFavoriteCount(mlsId);
    },
  },
};

module.exports = index;
