import React, { useState, useCallback } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { BestArea } from "@pcr/shared";
import NewItemModal from "./NewItemModal";
import { getArea, updateArea } from "../api/areaAPI";
import { toast } from "react-toastify";

type BestAreaCardProps = {
  bestArea: BestArea;
};

// export class BestArea {
//   ["location"]: string;
//   ["items"]: Array<{
//     itemName: string;
//     characterName: string;
//   }> = [];
//   ["itemCount"]: number;

//   constructor(areaName: string) {
//     this.location = areaName;
//   }
// }

const BestAreaCard: React.FC<BestAreaCardProps> = ({
  bestArea = {} as BestArea,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInsertItem = useCallback(
    async (itemName: string) => {
      console.log(bestArea);
      const area = await getArea(bestArea.location);
      console.log(area);
      area.Drops.push({
        Name: itemName,
        "Drop Rate": 100,
      });

      const success = await updateArea(area);
      if (success) {
        toast.success("Successfully updated area!");
      } else {
        toast.error("Failed to update area...");
      }
    },
    [bestArea]
  );

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
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title className="mb-3">{bestArea.location}</Card.Title>
        {/* <Card.Text> */}
        <Container>
          {bestArea.items.map((item) => {
            const value = `${item.itemName} [${item.characterName}]`;
            return (
              <Row key={value} className="mt-1 mb-1">
                <Col>{value}</Col>
                {/* <Col xs="auto">
                  <Button>{active ? "Disable" : "Enable"}</Button>
                </Col> */}
              </Row>
            );
          })}
          <Button
            className="mt-3"
            style={{ width: "100%" }}
            onClick={() => setIsModalVisible(true)}
          >
            Insert Item
          </Button>
          <Button variant="danger" className="mt-2" style={{ width: "100%" }}>
            Delete Area
          </Button>
        </Container>
        {/* </Card.Text> */}
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default BestAreaCard;
