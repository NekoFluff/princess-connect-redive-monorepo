import { ItemDrop } from "./ItemTypes";

export type AreaName = string;

export class Area {
  ["_id"]: any;
  ["Drops"]: Array<ItemDrop> = [];

  addDrop(itemDrop: ItemDrop) {
    this.Drops.push(itemDrop);
  }
}

export class UnwindedArea {
  ["_id"]: any;
  ["Item Dropped"]: string;
  ["Drop Rate"]: number;
}
