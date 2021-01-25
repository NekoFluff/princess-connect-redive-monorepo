import React from "react";
import {
  Card,
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import CharacterItem from "./CharacterItem";
import { Character } from "@pcr/shared";
import { updateCharacter } from "../api/characterAPI";
import { useState } from "react";
import { toast } from "react-toastify";

type CharacterCardProps = {
  character: Character;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [currentCharacter, setCurrentCharacter] = useState<Character>(
    character
  );

  return (
    <Card className="mt-3 mb-3">
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Container className="mb-4">
          <Row>
            <Col>
              <Card.Title className="mb-3 font-weight-bold">{`${currentCharacter["_id"]}`}</Card.Title>
            </Col>
            <Col xs="auto">
              <DropdownButton
                id="dropdown-basic-button"
                title={`Level ${currentCharacter["Current Level"]}`}
                onSelect={async (event) => {
                  const duplicate = {
                    ...currentCharacter,
                    ["Current Level"]: parseInt(`${event}`),
                  } as Character;

                  setCurrentCharacter(duplicate);
                  const success = await updateCharacter(duplicate);
                  if (success) {
                    toast.success("Successfully updated character!");
                  } else {
                    toast.error("Failed to update character...");
                  }
                }}
              >
                {currentCharacter["Rank Up Items"].map((_, index) => {
                  return (
                    <Dropdown.Item eventKey={`${index + 1}`}>{`Level ${
                      index + 1
                    }`}</Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
          </Row>
        </Container>

        <Container>
          {Object.entries(
            currentCharacter["Rank Up Items"][
              currentCharacter["Current Level"] - 1
            ]
          ).map(([itemName, acquired]) => {
            return (
              <CharacterItem
                key={itemName}
                level={currentCharacter["Current Level"]}
                characterName={currentCharacter["_id"]}
                itemName={itemName}
                acquired={acquired}
                onUpdateItem={async (newAcquired: boolean) => {
                  const duplicate = {
                    ...currentCharacter,
                    // ["Rank Up Items"]: [...currentCharacter["Rank Up Items"]],
                  };
                  duplicate["Rank Up Items"][duplicate["Current Level"] - 1][
                    itemName
                  ] = newAcquired;

                  setCurrentCharacter(duplicate as Character);

                  const success = await updateCharacter(currentCharacter);
                  if (success) {
                    toast.success("Successfully updated character!");
                  } else {
                    toast.error("Failed to update character...");
                  }
                }}
              />
            );
          })}
        </Container>

        <Container className="mt-3 mb-3">
          <Row>
            <Button className="mt-1 mb-1" style={{ width: "100%" }}>
              Create Item
            </Button>
          </Row>
          <Row>
            <Button className="mt-1 mb-1" style={{ width: "100%" }}>
              Create Level
            </Button>
          </Row>
          <Row>
            <Button
              variant="danger"
              className="mt-1 mb-1"
              style={{ width: "100%" }}
            >
              Delete Level
            </Button>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default CharacterCard;
