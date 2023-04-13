import React from "react";
import Layout from "./layouts/Layout";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Sidebar />
          <Col xs={10}>
            <MainContent />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default App;
