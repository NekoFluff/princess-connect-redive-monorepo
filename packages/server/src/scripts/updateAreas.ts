import { MongoClient } from "mongodb";
import { ItemDrop, Area } from "@pcr/shared";
import AreaRepository from "../repos/AreaRepository";
import ItemRepository from "../repos/ItemRepository";
import MongoConnector from "../mongodb/classes/MongoConnector";

MongoConnector.connectToMongo(async (client: MongoClient) => {
  // Instantiate repos
  let itemRepo = new ItemRepository();

  // Get the items
  let items = await itemRepo.getLocalItems();
  console.log(items);

  const areas: { [name: string]: Area } = {} as { [name: string]: Area };
  for (const [itemName, item] of Object.entries(items)) {
    for (const areaName of item.Locations) {
      if (!(areaName in areas)) {
        areas[areaName] = new Area();
        areas[areaName]._id = areaName;
      }
      let itemDrop = new ItemDrop();
      itemDrop.Name = itemName;
      itemDrop["Drop Rate"] = 100;
      areas[areaName].addDrop(itemDrop);
    }
  }

  console.log("Areas");
  console.log(Object.values(areas));
  const jsonifiedAreas = JSON.stringify(Object.values(areas));
  const areaRepo = new AreaRepository();
  await areaRepo.addAreas(Object.values(areas));

  MongoConnector.mongodbClient.close();
});
