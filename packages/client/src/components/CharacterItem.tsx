import { Card, Button, Container, Row, ListGroup, Col } from "react-bootstrap";

const CharacterItem = ({ active = true, itemName = "Item Name" }) => {
  return (
    <Row className="mt-1 mb-1">
      <Col>{itemName}</Col>
      <Col xs="auto">
        <Button>{active ? "Disable" : "Enable"}</Button>
      </Col>
    </Row>
  );
};

export default CharacterItem;
