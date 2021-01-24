import { ItemList } from "./ItemTypes";

export type CharacterName = string;

export class Character {
  ["_id"]: any;
  ["Rank Up Items"]: Array<ItemList>;
  ["Current Level"]: number;

  getRankUpItemsForLevel(level: number) {
    return this["Rank Up Items"][level - 1];
  }
}
