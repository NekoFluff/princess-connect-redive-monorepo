import CharacterListContainer from "./CharacterListContainer";
import BestAreaListContainer from "./BestAreaListContainer";
import RefreshButton from "../RefreshButton";
import { Container, Row, Col } from "react-bootstrap";

const MainPage = () => {
  return (
    <Container>
      <Container className={"mb-2"}>
        <RefreshButton />
      </Container>

      <Row noGutters>
        <Col>
          <CharacterListContainer />
        </Col>
        <Col xs={8} md={8} lg={8}>
          <BestAreaListContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
