import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Legal = () => {
  return (
    <div className="legal-page">
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>Terms of Use</h1>
            <p>
              Welcome to our contracting service. By accessing or using our
              website, you agree to comply with and be bound by the following
              terms and conditions of use.
            </p>
            <h3>1. Use of Our Website</h3>
            <p>
              Our website is intended for personal and non-commercial use only.
              You may not use the website for any other purpose without our
              prior written consent.
            </p>
            <h3>2. Intellectual Property</h3>
            <p>
              The content and materials on our website, including but not
              limited to text, graphics, logos, and images, are the property of
              our company or our licensors and are protected by intellectual
              property laws.
            </p>
            <h3>3. Limitation of Liability</h3>
            <p>
              We do not guarantee the accuracy or completeness of the content or
              materials on our website, and we are not responsible for any
              errors or omissions. We also do not warrant that our website will
              be error-free or uninterrupted.
            </p>
            <h3>4. Governing Law</h3>
            <p>
              These terms and conditions of use shall be governed by and
              construed in accordance with the laws of [Your State/Country]. Any
              disputes arising from or related to these terms and conditions of
              use shall be subject to the exclusive jurisdiction of the courts
              of [Your State/Country].
            </p>
            <p>
              By using our website, you agree to these terms and conditions of
              use. If you do not agree to these terms and conditions of use, you
              should not use our website.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Legal;
