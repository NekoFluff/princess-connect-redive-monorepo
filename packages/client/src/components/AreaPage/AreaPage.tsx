import AreaListContainer from "./AreaListContainer";
import { Container, Row, Col } from "react-bootstrap";

const AreaPage = () => {
  return (
    <Container>
      <Row noGutters>
        <Col>
          <AreaListContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default AreaPage;
