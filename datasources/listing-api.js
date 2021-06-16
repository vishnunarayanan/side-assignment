const { Listing } = require("../models/listing");
const { MongoDataSource } = require("apollo-datasource-mongodb");

/**
 * API for doing CRUD on Listing collection in MongoDB
 */
class ListingAPI extends MongoDataSource {
  /**
   * returns favorite count for a given mlsID
   * @param mlsId
   * @returns {number}
   */
  async getFavoriteCount(mlsId) {
    const listing = await this.model.findOne({ mlsId });
    return listing?.favoriteCount || 0;
  }

  /**
   * updates favorite count for a given mlsId
   * @param mlsId
   * @returns {Listing}
   */
  async addToFavorite(mlsId) {
    const isExists = await this.model.exists({ mlsId });
    if (isExists) {
      const listing = await this.model.findOneAndUpdate(
        { mlsId },
        {
          $inc: { favoriteCount: 1 },
        },
        { new: true }
      );
      return listing.favoriteCount;
    } else {
      const listing = new Listing({ mlsId, favoriteCount: 1 });
      await listing.save();
      return listing;
    }
  }
}

module.exports = ListingAPI;
