import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light py-4">
      <Container>
        <Row>
          <Col md={6}>
            <p className="text-muted mb-0">© 2023 E-COMMERCE SHOP</p>
          </Col>
          <Col md={6} className="text-md-right">
            <Link to="/about" className="text-muted mx-3">
              About Us
            </Link>
            <Link to="/legal" className="text-muted mx-3">
              Legal Terms
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
