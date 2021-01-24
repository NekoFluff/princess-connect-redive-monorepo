import React from "react";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import { getCharacters } from "../api/characterAPI";
import { Character } from "@pcr/shared";

type CharacterListContainerProps = {};

type ICharacters = { [name: string]: Character };

const CharacterListContainer: React.FC<CharacterListContainerProps> = () => {
  const [characters, setCharacters] = useState<ICharacters>({} as ICharacters);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      const characters = await getCharacters();
      console.log("Got Characters");
      console.log(characters);
      setCharacters(characters);
    } // Execute the created function directly
    anyNameFunction();

    return () => {
      console.log("Cleanup");
    };
  }, []);

  return (
    <Container>
      {Object.entries(characters).map(([characterName, character]) => {
        return (
          <CharacterCard
            key={characterName}
            name={characterName}
            rankUpItems={
              character["Rank Up Items"][character["Current Level"] - 1]
            }
          />
        );
      })}
    </Container>
  );
};

export default CharacterListContainer;
