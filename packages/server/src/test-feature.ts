import { MongoClient } from "mongodb";
import { AreaName, ItemName } from "@pcr/shared";
import AreaRepository from "./repos/AreaRepository";
import CharacterRepository from "./repos/CharacterRepository";
import MongoConnector from "./mongodb/classes/MongoConnector";

MongoConnector.connectToMongo(async (client: MongoClient) => {
  let charRepo = new CharacterRepository();
  const result = await charRepo.updateItemStatus(
    "Djeeta",
    7,
    "Angelic Blade",
    true
  );
  MongoConnector.mongodbClient.close();
});
