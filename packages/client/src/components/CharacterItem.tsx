import { Button, Row, Col } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
// import { updateCharacterItem } from "../api/characterAPI";
// import { toast } from "react-toastify";
import { DashCircle } from "react-bootstrap-icons";
import withDoubleClick from "./hoc/withDoubleClick";

type CharacterItemProps = {
  // characterName: string;
  // level: number;
  acquired: boolean;
  itemName: string;
  onUpdateItem: (itemName: string, newAcquired: boolean) => any;
  onDeleteItem: (deletedItemName: string) => any;
};

const CharacterItem: React.FC<CharacterItemProps> = ({
  // characterName = "Character Name",
  // level = -1,
  acquired = true,
  itemName = "Item Name",
  onUpdateItem = null,
  onDeleteItem = null,
}) => {
  const [canAcquire, setCanAquire] = useState(acquired);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);

  useEffect(() => {
    setCanAquire(acquired);
    setButtonLoading(false);
  }, [acquired]);

  // Deprecated 1/24/2021: Unnecessary with the new onUpdateItem implementation
  // const handleSuccess = useCallback(
  //   (success: boolean) => {
  //     if (success) {
  //       setCanAquire(!canAcquire);
  //       toast.success("Success!");
  //     } else {
  //       toast.error("An unexpected error occured...");
  //     }
  //     setButtonLoading(false);
  //   },
  //   [canAcquire, setCanAquire, setButtonLoading]
  // );

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
        onUpdateItem(itemName, gotIt);
      }
    },
    [
      // characterName,
      // level,
      itemName,
      setButtonLoading,
      // handleSuccess,
      onUpdateItem,
    ]
  );

  const DashCircleWithDoubleClick = withDoubleClick(DashCircle);

  return (
    <Row className="mt-1 mb-1">
      <Col xs="auto">
        <DashCircleWithDoubleClick
          color={deleteSelected ? "green" : "red"}
          cursor={"pointer"}
          style={{ verticalAlign: "middle" }}
          onDoubleClick={() => {
            console.log("Destroy Item");
            if (onDeleteItem) {
              onDeleteItem(itemName);
            }
          }}
          onClickUpdate={(value: boolean) => {
            setDeleteSelected(value);
          }}
          overrideSelected={deleteSelected}
        />
      </Col>
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
