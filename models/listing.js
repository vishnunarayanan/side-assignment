const mongoose = require("mongoose");
const Joi = require("joi");

const Listing = mongoose.model(
  "Listings",
  new mongoose.Schema({
    favoriteCount: {
      type: Number,
    },
    mlsId: {
      type: String,
    },
  })
);

function validateListing(listing) {
  const schema = Joi.object({
    favoriteCount: Joi.number().min(0),
    mlsId: Joi.string().required(),
  });

  return schema.validate(listing);
}

exports.Listing = Listing;
exports.validateListing = validateListing;
