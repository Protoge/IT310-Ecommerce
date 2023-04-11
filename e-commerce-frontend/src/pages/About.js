import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const About = () => {
  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <Image
            src={
              "https://res.cloudinary.com/dxrcubiuj/image/upload/v1678648981/E-commerce_Shop_hhsiud.png"
            }
            className="img-fluid"
          />
        </Col>
        <Col md={6}>
          <h2 className="mb-4">About Our Contracting Service</h2>
          <p className="lead">
            We are a team of experienced contractors dedicated to providing
            top-quality contracting services to homeowners and businesses.
          </p>
          <p className="mb-4">
            Our services range from home renovations and repairs to commercial
            construction and remodeling. No matter the size or complexity of the
            project, we are committed to delivering exceptional results on time
            and within budget.
          </p>
          <p className="mb-4">
            We understand the importance of trust and communication in any
            contracting project. That's why we work closely with our clients
            every step of the way, keeping them informed and involved in the
            process from start to finish.
          </p>
          <p className="mb-4">
            Contact us today to learn more about our services and how we can
            help bring your contracting project to life.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
