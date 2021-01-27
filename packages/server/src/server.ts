const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

import { MongoClient } from "mongodb";
import { AreaName, ItemName, BestArea, Character } from "@pcr/shared";
import AreaRepository from "./repos/AreaRepository";
import CharacterRepository from "./repos/CharacterRepository";
import MongoConnector from "./mongodb/classes/MongoConnector";

MongoConnector.connectToMongo(async (client: MongoClient) => {});

require("dotenv").config();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/characters", async (req: any, res: any) => {
  const characterRepo = new CharacterRepository();
  let characters = await characterRepo.getCharacters();
  res.send(characters);
});

// Deprecated 1/24/2021: Unnecessary with the new /character 'PUT' endpoint to update entire Character objects
app.put("/characters", async (req: any, res: any) => {
  const characterRepo = new CharacterRepository();
  const result = await characterRepo.updateItemStatus(
    req.body.characterName,
    req.body.level,
    req.body.itemName,
    req.body.acquired
  );
  res.send(result);
});

app.put("/character", async (req: any, res: any) => {
  const characterRepo = new CharacterRepository();
  const result = await characterRepo.update([req.body as Character]);
  res.send(result);
});

app.get("/bestLocations", async (req: any, res: any) => {
  // Create the repos
  const characterRepo = new CharacterRepository();
  const areaRepo = new AreaRepository();

  // Get the character data
  let characters = await characterRepo.getCharacters();
  console.log("Loaded Character Data");
  // console.log(characters)

  let bestAreas: Record<AreaName, BestArea> = {};

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
    console.log(`AREAS ${characterName}`);
    console.log(areas);

    // For every location that the item can be found at...
    for (const [_, unwindedArea] of Object.entries(areas)) {
      const areaName = unwindedArea.Area;

      if (!(areaName in bestAreas)) {
        bestAreas[areaName] = new BestArea(areaName);
      }

      // Add the item to the location
      bestAreas[areaName].items.push({
        itemName: unwindedArea["Item Drop"],
        characterName: characterName,
      });
    }
  }

  // Convert the bestAreas dictionary into an array
  let sortedLocations: Array<any> = [];
  Object.entries(bestAreas).forEach(([locationName, bestArea]) => {
    bestArea.itemCount = bestArea.items.length;
    sortedLocations.push(bestArea);
  });

  // Sort in ascending order (so the best locations are visible at the bottom of the terminal)
  sortedLocations.sort((location1, location2) => {
    return location2.itemCount - location1.itemCount;
  });

  console.log("Best Locations:");
  console.log(sortedLocations);
  res.send(sortedLocations);
});

const port = process.env.PORT || 8080;
console.log(`Now running on port ${port}`);

app.listen(port);
