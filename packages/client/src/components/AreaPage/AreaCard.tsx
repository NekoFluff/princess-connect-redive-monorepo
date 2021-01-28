import React, { useEffect, useCallback, useState } from "react";
import { Area, ItemDrop } from "@pcr/shared";
import { toast } from "react-toastify";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { updateArea } from "../../api/areaAPI";
import withDoubleClick from "../hoc/withDoubleClick";
import NewItemModal from "../MainPage/NewItemModal";
import AreaItem from "./AreaItem";

type AreaCardProps = {
  area: Area;
  onDeleteArea?: () => void;
};

const AreaCard: React.FC<AreaCardProps> = ({
  area = {} as Area,
  onDeleteArea = null,
}) => {
  const [currentArea, setCurrentArea] = useState<Area>(area);
  const [deleteAttempted, setDeleteAttempted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setDeleteAttempted(false);
  }, [currentArea]);

  const deleteCurrentArea = useCallback(async () => {
    if (onDeleteArea) onDeleteArea();
  }, [onDeleteArea]);

  const handleDeleteItem = useCallback(
    async (deletedItemName: string) => {
      const duplicate = {
        ...currentArea,
      } as Area;

      duplicate.Drops = duplicate.Drops.filter((drop) => {
        return drop.Name !== deletedItemName;
      });

      setCurrentArea(duplicate);

      const success = await updateArea(duplicate);
      if (success) {
        toast.success("Successfully updated area!");
      } else {
        toast.error("Failed to update area...");
      }
    },
    [currentArea, setCurrentArea]
  );

  const handleInsertItem = useCallback(
    async (itemName: string) => {
      const duplicate = {
        ...currentArea,
      } as Area;

      const itemDrop = {} as ItemDrop;
      itemDrop.Name = itemName;
      itemDrop["Drop Rate"] = 100;
      duplicate.Drops.push(itemDrop);

      setCurrentArea(duplicate);

      const success = await updateArea(duplicate);
      if (success) {
        toast.success("Successfully updated area!");
      } else {
        toast.error("Failed to update area...");
      }
    },
    [currentArea, setCurrentArea]
  );

  const DoubleClickDeleteButton = withDoubleClick(Button);

  return (
    <Card className="mt-3 mb-3">
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
              <Card.Title className="mb-3 font-weight-bold">{`${currentArea["_id"]}`}</Card.Title>
            </Col>
          </Row>
        </Container>

        <Container>
          {currentArea.Drops.map((itemDrop) => {
            return (
              <AreaItem
                key={itemDrop.Name}
                itemName={itemDrop.Name}
                onDeleteItem={handleDeleteItem}
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
            <DoubleClickDeleteButton
              variant="danger"
              className="mt-1 mb-1"
              style={{ width: "100%" }}
              onClickUpdate={(attempted: boolean) => {
                setDeleteAttempted(attempted);
              }}
              onDoubleClick={() => {
                deleteCurrentArea();
              }}
              overrideSelected={deleteAttempted}
            >
              {deleteAttempted ? "Are You Sure? Confirm Delete" : "Delete Area"}
            </DoubleClickDeleteButton>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default AreaCard;
