import { MongoClient } from "mongodb";
import { AreaName, ItemName } from "@pcr/shared";
import AreaRepository from "./repos/AreaRepository";
import CharacterRepository from "./repos/CharacterRepository";
import MongoConnector from "./mongodb/classes/MongoConnector";

MongoConnector.connectToMongo(async (client: MongoClient) => {
  // Create the repos
  const characterRepo = new CharacterRepository();
  const areaRepo = new AreaRepository();

  // Get the character data
  let characters = await characterRepo.getCharacters();
  console.log("Loaded Character Data");
  // console.log(characters)

  let bestAreas: Record<AreaName, Array<ItemName>> = {};

  // For every character...
  for (const [characterName, character] of Object.entries(characters)) {
    // Get the rank up items required...
    const rankUpItems = character.getRankUpItemsForLevel(
      character["Current Level"]
    );

    // Filter out already acquired items
    const itemNames: Array<ItemName> = [];
    for (const [itemName, alreadyAcquired] of Object.entries(rankUpItems)) {
      if (alreadyAcquired) continue; // If the item has already been acquired for that character, don't count it
      itemNames.push(itemName);
    }

    let areas = await areaRepo.getUnwindedAreasForItems(itemNames);
    // console.log(areas);

    // For every location that the item can be found at...
    for (const [areaName, unwindedArea] of Object.entries(areas)) {
      if (!(areaName in bestAreas)) {
        bestAreas[areaName] = [];
      }

      // Add the item to the location
      bestAreas[areaName].push(
        `${unwindedArea["Item Dropped"]} [${characterName}]`
      );
    }
  }

  // Convert the bestAreas dictionary into an array
  let sortedLocations: Array<any> = [];
  Object.entries(bestAreas).forEach(([locationName, itemsArray]) => {
    sortedLocations.push({
      location: locationName,
      items: itemsArray,
      itemCount: itemsArray.length,
    });
  });

  // Sort in ascending order (so the best locations are visible at the bottom of the terminal)
  sortedLocations.sort((location1, location2) => {
    return location1.itemCount - location2.itemCount;
  });

  console.log("Best Locations:");
  console.log(sortedLocations);

  MongoConnector.mongodbClient.close();
});
