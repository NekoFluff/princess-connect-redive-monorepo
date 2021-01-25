import { Character } from "@pcr/shared";
const axios = require("axios").default;
// require("axios-debug-log");

// Make a request for a user with a given ID
export async function getCharacters() {
  const result = await axios.get("/api/characters");
  return result.data;
}

export async function updateCharacterItem(
  characterName: string,
  level: number,
  itemName: string,
  acquired: boolean
) {
  const result = await axios.put("/api/characters", {
    characterName,
    level,
    itemName,
    acquired,
  });
  const success = result.data.nModified > 0;
  return success;
}

export async function updateCharacter(character: Character) {
  const result = await axios.put("/api/character", character);
  return result.status === 200;
}
