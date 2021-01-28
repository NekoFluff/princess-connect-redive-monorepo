import { ItemDrop } from "./ItemTypes";

export type AreaName = string;

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
  ["_id"]: string;
  ["Area"]: string;
  ["Item Drop"]: string;
  ["Drop Rate"]: number;
}

export class Area {
  ["_id"]: any;
  ["Drops"]: Array<ItemDrop> = [];

  addDrop(itemDrop: ItemDrop) {
    this.Drops.push(itemDrop);
  }
}
