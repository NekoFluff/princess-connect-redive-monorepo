import { Card, Button, Container, Row, ListGroup, Col } from "react-bootstrap";

const CharacterItem = ({ active = true, itemName = "Item Name" }) => {
  return (
    <Row>
      <Col>{itemName}</Col>
      <Col>
        <Button>{active ? "Disable" : "Enable"}</Button>
      </Col>
    </Row>
  );
};

export default CharacterItem;
