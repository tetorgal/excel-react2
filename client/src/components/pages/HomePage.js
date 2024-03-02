import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "reactstrap";
import StylizedFileInput from "../stylizedFileInput";

function HomePage() {
  return (
    <Container className="home-page">
      <Row className="justify-content-center align-items-center mt-4">
        <Col xs="10" md="6">
          <Card className="p-4">
            <h1 className="text-center mb-4">Bienvenido</h1>
            <p className="text-center mb-4">
              Por favor, selecciona un archivo de Excel para cargar
            </p>
            <StylizedFileInput />
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs="6" md="4">
          <Button tag={Link} to="/asistencia" color="primary" block>
            Ir a la página de Asistencia
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
