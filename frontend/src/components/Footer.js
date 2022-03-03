import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Card bg="success" text="light" className="text-center">
        <Card.Footer>
          <Container>
            <Row>
              <Col>
                <a href="https://github.com/FluffyFoxTail">Creator</a>
              </Col>
            </Row>
            <Row>
              <Col className="text-center py-3">Copyright &copy; eComrc</Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    </footer>
  );
};

export default Footer;
