import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const DeliverySteps = ({
  loginStep,
  deliveryStep,
  paymentStep,
  placeOrderStep,
}) => {
  return (
    <Nav className="justify-content-center mb-3">
      <Nav.Item>
        {loginStep ? (
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {deliveryStep ? (
          <LinkContainer to="/delivery">
            <Nav.Link>Delivery</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Delivery</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {paymentStep ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {placeOrderStep ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default DeliverySteps;
