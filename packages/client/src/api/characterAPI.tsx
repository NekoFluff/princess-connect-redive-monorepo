const axios = require("axios").default;
require("axios-debug-log");

// Make a request for a user with a given ID
export async function getCharacters() {
  console.log("AAA2?");
  require("axios-debug-log");
  window.localStorage.debug = "axios";
  // console.log(axios.getUri("/api/characters"));
  const result = await axios.get("/api/characters");
  return result.data;
}
