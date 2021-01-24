export type ItemName = string;

export type ItemList = Record<ItemName, boolean>;

export class ItemDrop {
  ["Name"]: string;
  ["Drop Rate"]: number;
}
