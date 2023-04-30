import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const About = () => {
  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <Image
            src={
              "https://res.cloudinary.com/dxrcubiuj/image/upload/v1682839182/flexwear_zves94.png"
            }
            className="img-fluid"
          />
        </Col>
        <Col md={6}>
          <h2 className="mb-4">About Us</h2>
          <p className="lead">
            Welcome to Flexwear, the ultimate destination for fitness apparel.
            Our mission is to provide high-quality, comfortable, and stylish
            activewear that helps you look and feel your best during any workout
            or physical activity.
          </p>
          <p className="mb-4">
            We understand that every body is different, which is why we offer a
            wide range of sizes and styles to fit every shape and preference.
            From classic tanks and tees to trendy leggings and joggers, we've
            got you covered for all your workout needs.
          </p>
          <p className="mb-4">
            At Flexwear, we believe that fitness should be accessible to
            everyone. That's why we strive to make our products affordable
            without compromising on quality. We source our materials from
            trusted suppliers and use innovative manufacturing techniques to
            ensure that our products are durable, comfortable, and long-lasting.
          </p>
          <p className="mb-4">
            We are a team of fitness enthusiasts, just like you. We understand
            the importance of quality gear that supports your active lifestyle.
            Our passion for fitness inspires us to continually improve and
            expand our product line, with new designs and styles being added
            regularly.
          </p>
          <p className="mb-4">
            We are committed to providing exceptional customer service, from the
            moment you visit our website to the day your order arrives. If you
            have any questions or concerns, our friendly and knowledgeable team
            is always here to help.
          </p>
          <p className="mb-4">
            Thank you for choosing Flexwear for your fitness apparel needs.
            We're excited to join you on your fitness journey and can't wait to
            see how you #FlexYourBest.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
