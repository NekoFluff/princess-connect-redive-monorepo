import React from "react";
import { Card, Button, Container, Row, ListGroup, Col } from "react-bootstrap";
import CharacterItem from "./CharacterItem";
import { ItemName, AreaName } from "@pcr/shared";

type BestAreaCardProps = {
  areaName: AreaName;
  items: ItemName[];
};

const BestAreaCard: React.FC<BestAreaCardProps> = ({
  areaName = "Area Name",
  items = [],
}) => {
  return (
    <Card className="mt-2 mb-2">
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{areaName}</Card.Title>
        {/* <Card.Text> */}
        <Container>
          {items.map((itemName) => {
            return (
              <Row key={itemName} className="mt-1 mb-1">
                <Col>{itemName}</Col>
                {/* <Col xs="auto">
                  <Button>{active ? "Disable" : "Enable"}</Button>
                </Col> */}
              </Row>
            );
          })}
        </Container>
        {/* </Card.Text> */}
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default BestAreaCard;
