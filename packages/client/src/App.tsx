import React from "react";
import "./App.css";
import CharacterListContainer from "./components/CharacterListContainer";
import BestAreaListContainer from "./components/BestAreaListContainer";
import RefreshButton from "./components/RefreshButton";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Container>
        <Container className={"mb-2"}>
          <RefreshButton />
        </Container>

        <Row noGutters>
          <Col>
            <CharacterListContainer />
          </Col>
          <Col xs={8}>
            <BestAreaListContainer />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
