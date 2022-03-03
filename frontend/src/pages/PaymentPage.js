import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { savePaymentMethod } from "../actions/orderItemsActions";
import FormContainer from "../components/FormContainer";
import DeliverySteps from "../components/DeliverySteps";

const PaymentPage = () => {
  const order = useSelector((state) => state.orderItems);
  const { deliveryAddress } = order;

  const navigate = useNavigate();
  if (!deliveryAddress.address) {
    navigate("/delivery");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <DeliverySteps loginStep deliveryStep paymentStep />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="postIndex">
          <Form.Label>Select Method</Form.Label>
          <Col>
            <Form.Check
            //  className="fa-brands fa-cc-paypal"
              type="radio"
              label="💳 PayPal"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" className="my-3" variant="success">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
