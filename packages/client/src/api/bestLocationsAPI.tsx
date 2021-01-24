const axios = require("axios").default;
require("axios-debug-log");

// Make a request for a user with a given ID
export async function getBestLocations() {
  const result = await axios.get("/api/bestLocations");
  return result.data;
}
