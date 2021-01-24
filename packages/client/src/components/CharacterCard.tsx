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
    <Card style={{ width: "18rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        {/* <Card.Text> */}
        <Container>
          {Object.entries(rankUpItems).map(([itemName, acquired]) => {
            return <CharacterItem active={acquired} itemName={itemName} />;
          })}
        </Container>
        {/* </Card.Text> */}
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default CharacterCard;
