const { RESTDataSource } = require("apollo-datasource-rest");

/**
 * MLS(Multiple Listing Service) APIs is a wrapper for SimplyRETS API
 */
class MLSApi extends RESTDataSource {
  auth = Buffer.from("simplyrets:simplyrets").toString("base64");

  constructor() {
    super();
    this.baseURL = "https://api.simplyrets.com/";
  }
  willSendRequest(request) {
    request.headers.set("Authorization", "Basic  " + this.auth);
  }

  getAllListings(city) {
    if (city) {
      return this.get(`properties?q=${city}`);
    }
    return this.get("properties");
  }

  getListing(mlsId) {
    return this.get(`properties/${mlsId}`);
  }
}

module.exports = MLSApi;
