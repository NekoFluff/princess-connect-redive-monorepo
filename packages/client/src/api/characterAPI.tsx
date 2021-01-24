const axios = require("axios").default;
require("axios-debug-log");

// Make a request for a user with a given ID
export async function getCharacters() {
  require("axios-debug-log");
  window.localStorage.debug = "axios";
  const result = await axios.get("/api/characters");
  return result.data;
}

export async function updateCharacterItem(
  characterName: string,
  itemName: string,
  acquired: boolean
) {
  require("axios-debug-log");
  window.localStorage.debug = "axios";
  const result = await axios.put("/api/characters", {
    characterName,
    itemName,
    acquired,
  });
  console.log("Put request result");
  console.log(result);
  return result.data;
}
