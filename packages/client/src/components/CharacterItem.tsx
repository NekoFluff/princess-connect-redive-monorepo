import { Card, Button, Container, Row, ListGroup, Col } from "react-bootstrap";
import { useCallback } from "react";
import { updateCharacterItem } from "../api/characterAPI";

const CharacterItem = ({
  characterName = "Character Name",
  acquired = true,
  itemName = "Item Name",
}) => {
  const gotItClicked = useCallback(() => {
    console.log("Got it clicked");
    updateCharacterItem(characterName, itemName, true);
  }, [characterName, itemName]);

  const undoClicked = useCallback(() => {
    console.log("Undo clicked");
    updateCharacterItem(characterName, itemName, false);
  }, [characterName, itemName]);

  return (
    <Row className="mt-1 mb-1">
      <Col>{itemName}</Col>
      <Col xs="auto">
        <Button
          variant={acquired ? "danger" : "success"}
          onClick={() => {
            if (acquired) {
              undoClicked();
            } else {
              gotItClicked();
            }
          }}
        >
          {acquired ? "Undo" : "Got It!"}
        </Button>
      </Col>
    </Row>
  );
};

export default CharacterItem;
