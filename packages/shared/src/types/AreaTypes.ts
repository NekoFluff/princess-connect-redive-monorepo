import { ItemDrop } from "./ItemTypes";

export type AreaName = string;

export class Area {
  ["_id"]: any;
  ["Drops"]: Array<ItemDrop> = [];

  addDrop(itemDrop: ItemDrop) {
    this.Drops.push(itemDrop);
  }
}

export class BestArea {
  ["location"]: string;
  ["items"]: Array<{
    itemName: string;
    characterName: string;
  }> = [];
  ["itemCount"]: number;

  constructor(areaName: string) {
    this.location = areaName;
  }
}

export class UnwindedArea {
  ["_id"]: any;
  ["Item Dropped"]: string;
  ["Drop Rate"]: number;
}
