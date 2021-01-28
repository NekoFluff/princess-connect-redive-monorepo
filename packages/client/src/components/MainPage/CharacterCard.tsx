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
import { updateCharacter } from "../../api/characterAPI";
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import withDoubleClick from "../hoc/withDoubleClick";
import NewItemModal from "./NewItemModal";

type CharacterCardProps = {
  character: Character;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [currentCharacter, setCurrentCharacter] = useState<Character>(
    character
  );
  const [deleteAttempted, setDeleteAttempted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setDeleteAttempted(false);
  }, [currentCharacter]);

  const deleteCurrentLevel = useCallback(async () => {
    const duplicate = {
      ...currentCharacter,
      "Rank Up Items": [
        ...currentCharacter["Rank Up Items"].slice(
          0,
          currentCharacter["Current Level"] - 1
        ),
      ],
    } as Character;
    duplicate["Current Level"] = duplicate["Rank Up Items"].length;

    setCurrentCharacter(duplicate);

    const success = await updateCharacter(duplicate);
    if (success) {
      toast.success("Successfully updated character!");
    } else {
      toast.error("Failed to update character...");
    }
  }, [currentCharacter, setCurrentCharacter]);

  const handleDeleteItem = useCallback(
    async (deletedItemName: string) => {
      const duplicate = {
        ...currentCharacter,
        "Rank Up Items": [...currentCharacter["Rank Up Items"]],
      } as Character;
      delete duplicate["Rank Up Items"][duplicate["Current Level"] - 1][
        deletedItemName
      ];

      setCurrentCharacter(duplicate);

      const success = await updateCharacter(duplicate);
      if (success) {
        toast.success("Successfully updated character!");
      } else {
        toast.error("Failed to update character...");
      }
    },
    [currentCharacter, setCurrentCharacter]
  );

  const handleUpdateItem = async (itemName: string, newAcquired: boolean) => {
    const duplicate = {
      ...currentCharacter,
      // ["Rank Up Items"]: [...currentCharacter["Rank Up Items"]],
    } as Character;
    duplicate["Rank Up Items"][duplicate["Current Level"] - 1][
      itemName
    ] = newAcquired;

    setCurrentCharacter(duplicate);

    const success = await updateCharacter(duplicate);
    if (success) {
      toast.success("Successfully updated character!");
    } else {
      toast.error("Failed to update character...");
    }
  };

  const handleInsertItem = useCallback(
    async (itemName: string) => {
      const duplicate = {
        ...currentCharacter,
        "Rank Up Items": [...currentCharacter["Rank Up Items"]],
      } as Character;
      duplicate["Rank Up Items"][duplicate["Current Level"] - 1][
        itemName
      ] = false;

      setCurrentCharacter(duplicate);

      const success = await updateCharacter(duplicate);
      if (success) {
        toast.success("Successfully updated character!");
      } else {
        toast.error("Failed to update character...");
      }
    },
    [currentCharacter, setCurrentCharacter]
  );

  const DoubleClickDeleteButton = withDoubleClick(Button);

  return (
    <Card className="mt-3 mb-3">
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <NewItemModal
        show={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        onConfirm={(itemName: string) => {
          handleInsertItem(itemName);
          setIsModalVisible(false);
        }}
      />

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
                    "Current Level": parseInt(`${event}`),
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
                // level={currentCharacter["Current Level"]}
                // characterName={currentCharacter["_id"]}
                itemName={itemName}
                acquired={acquired}
                onDeleteItem={handleDeleteItem}
                onUpdateItem={handleUpdateItem}
              />
            );
          })}
        </Container>

        <Container className="mt-3 mb-3">
          <Row>
            <Button
              className="mt-1 mb-1"
              style={{ width: "100%" }}
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              Create Item
            </Button>
          </Row>
          <Row>
            <Button
              className="mt-1 mb-1"
              style={{ width: "100%" }}
              onClick={async () => {
                const duplicate = {
                  ...currentCharacter,
                  "Rank Up Items": [...currentCharacter["Rank Up Items"], {}],
                } as Character;
                duplicate["Current Level"] = duplicate["Rank Up Items"].length;

                setCurrentCharacter(duplicate);

                const success = await updateCharacter(duplicate);
                if (success) {
                  toast.success("Successfully updated character!");
                } else {
                  toast.error("Failed to update character...");
                }
              }}
            >
              Create Level
            </Button>
          </Row>
          <Row>
            <DoubleClickDeleteButton
              variant="danger"
              className="mt-1 mb-1"
              style={{ width: "100%" }}
              onClickUpdate={(attempted: boolean) => {
                setDeleteAttempted(attempted);
              }}
              onDoubleClick={() => {
                deleteCurrentLevel();
              }}
              overrideSelected={deleteAttempted}
            >
              {deleteAttempted
                ? "Are You Sure? Confirm Delete"
                : "Delete Level"}
            </DoubleClickDeleteButton>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default CharacterCard;
