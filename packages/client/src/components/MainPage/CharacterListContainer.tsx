import { Character } from "@pcr/shared";
import { Container } from "react-bootstrap";
import { getCharacters } from "../../api/characterAPI";
import CharacterCard from "./CharacterCard";
import React, { useEffect, useState } from "react";

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
        return <CharacterCard key={characterName} character={character} />;
      })}
    </Container>
  );
};

export default CharacterListContainer;
