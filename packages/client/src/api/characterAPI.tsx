const axios = require("axios").default;

// Make a request for a user with a given ID
export async function getCharacters() {
  const result = await axios.get("/characters");
  return result.data;
}
