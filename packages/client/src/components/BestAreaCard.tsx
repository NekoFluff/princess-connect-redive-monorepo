import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { BestArea } from "@pcr/shared";

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
  return (
    <Card className="mt-3 mb-3">
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
        </Container>
        {/* </Card.Text> */}
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default BestAreaCard;
