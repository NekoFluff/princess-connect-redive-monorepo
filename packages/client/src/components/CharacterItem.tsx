import { Card, Button, Container, Row, ListGroup, Col } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import { updateCharacterItem } from "../api/characterAPI";
import { toast } from "react-toastify";

type CharacterItemProps = {
  characterName: string;
  level: number;
  acquired: boolean;
  itemName: string;
  onUpdateItem: (newAcquired: boolean) => any;
};

const CharacterItem: React.FC<CharacterItemProps> = ({
  characterName = "Character Name",
  level = -1,
  acquired = true,
  itemName = "Item Name",
  onUpdateItem = null,
}) => {
  const [canAcquire, setCanAquire] = useState(acquired);
  const [isButtonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    setCanAquire(acquired);
    setButtonLoading(false);
  }, [acquired]);

  // Deprecated 1/24/2021: Unnecessary with the new onUpdateItem implementation
  const handleSuccess = useCallback(
    (success: boolean) => {
      if (success) {
        setCanAquire(!canAcquire);
        toast.success("Success!");
      } else {
        toast.error("An unexpected error occured...");
      }
      setButtonLoading(false);
    },
    [canAcquire, setCanAquire, setButtonLoading]
  );

  const handleClick = useCallback(
    async (gotIt: boolean) => {
      setButtonLoading(true);
      // Deprecated 1/24/2021: Unnecessary with the new onUpdateItem implementation
      // const success = await updateCharacterItem(
      //   characterName,
      //   level,
      //   itemName,
      //   gotIt
      // );
      // handleSuccess(success);

      if (onUpdateItem) {
        onUpdateItem(gotIt);
      }
    },
    [
      characterName,
      level,
      itemName,
      setButtonLoading,
      handleSuccess,
      onUpdateItem,
    ]
  );

  return (
    <Row className="mt-1 mb-1">
      <Col>{itemName}</Col>
      <Col xs="auto">
        <Button
          disabled={isButtonLoading}
          variant={canAcquire ? "danger" : "success"}
          onClick={() => {
            handleClick(!canAcquire);
          }}
        >
          {canAcquire ? "Undo" : "Got It!"}
        </Button>
      </Col>
    </Row>
  );
};

export default CharacterItem;
