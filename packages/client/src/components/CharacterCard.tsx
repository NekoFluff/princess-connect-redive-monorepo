import React from "react";
import { Card, Button, Container, Row, ListGroup, Col } from "react-bootstrap";
import CharacterItem from "./CharacterItem";
import { ItemList } from "@pcr/shared";

type CharacterCardProps = {
  name: string;
  rankUpItems: ItemList;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  name = "Character Name",
  rankUpItems = {},
}) => {
  return (
    <Card className="mt-3 mb-3">
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title className="mb-3">{name}</Card.Title>
        {/* <Card.Text> */}
        <Container>
          {Object.entries(rankUpItems).map(([itemName, acquired]) => {
            return (
              <CharacterItem
                key={itemName}
                characterName={name}
                itemName={itemName}
                acquired={acquired}
              />
            );
          })}
        </Container>
        {/* </Card.Text> */}
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default CharacterCard;
