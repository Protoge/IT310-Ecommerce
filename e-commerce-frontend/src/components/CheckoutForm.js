import { useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";
import { Alert, Col, Form, Row } from "react-bootstrap";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");

  const handlePay = (e) => {};
  return (
    <Col md={7} className="cart-payment-container">
      <Form onSubmit={handlePay}>
        <Row>{alertMessage && <Alert>{alertMessage}</Alert>}</Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={user.name}
              disabled
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={user.email}
              disabled
            ></Form.Control>
          </Form.Group>
        </Col>
      </Form>
    </Col>
  );
};

export default CheckoutForm;
