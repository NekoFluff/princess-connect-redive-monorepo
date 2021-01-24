import Collection from "../mongodb/classes/Collection";
import { AreaName, ItemName } from "@pcr/shared";

const fs = require("fs");

export class Item {
  ["_id"]: any;
  ["Locations"]: Array<AreaName>;
}

// class ItemRepository {
//   static loadItemData(): Record<ItemName, Item> {
//     let rawdata = fs.readFileSync("./src/Items.json") as string;
//     let items = JSON.parse(rawdata);

//     Object.keys(items).map(function (key) {
//       items[key] = Object.assign(new Item(), items[key]);
//     });

//     return items;
//   }
// }

export default class ItemRepository extends Collection<Item> {
  constructor() {
    super("princess-connect-redive", "items", Item);
  }

  async getItems(): Promise<Record<ItemName, Item>> {
    const filter = {};
    return super.find(filter);
  }

  getLocalItems(): Record<ItemName, Item> {
    let rawdata = fs.readFileSync("./src/temp/Items.json") as string;
    let items = JSON.parse(rawdata);

    Object.keys(items).map(function (key) {
      items[key] = Object.assign(new Item(), items[key]);
    });

    return items;
  }
}
