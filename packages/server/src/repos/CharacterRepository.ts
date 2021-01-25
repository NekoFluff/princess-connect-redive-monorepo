import { CharacterName, Character } from "@pcr/shared";
import Collection from "../mongodb/classes/Collection";

// class CharacterRepository {
// 	static loadCharacterData() : Record<CharacterName, Character> {
// 		let rawdata = fs.readFileSync('./src/Characters.json') as string;
// 		let characters = JSON.parse(rawdata);

// 		Object.keys(characters).map(function (key) {
// 			characters[key] = Object.assign(new Character, characters[key]);
// 		});

// 		return characters;
// 	}
// }

export default class CharacterRepository extends Collection<Character> {
  constructor() {
    super("princess-connect-redive", "characters", Character);
  }

  async getCharacters(): Promise<Record<CharacterName, Character>> {
    const filter = {};
    return super.find(filter);
  }

  async updateItemStatus(
    character: string,
    level: number,
    item: string,
    acquired: boolean
  ) {
    const collection = this.getConnection();
    const filter = { _id: character };
    const update = {
      $set: { [`Rank Up Items.${level - 1}.${item}`]: acquired },
    };

    const result = await collection.updateOne(filter, update);

    console.log(`Update Item Status Result: ${JSON.stringify(result)}`);
    return result;
  }
}
