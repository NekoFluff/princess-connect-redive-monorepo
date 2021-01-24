import { ItemList, CharacterName, Character } from "@pcr/shared";
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
}
