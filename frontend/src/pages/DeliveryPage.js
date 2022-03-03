import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { saveDeliveryAddress } from "../actions/orderItemsActions";
import FormContainer from "../components/FormContainer";
import DeliverySteps from "../components/DeliverySteps";

const DeliveryPage = () => {
  const order = useSelector((state) => state.orderItems);
  const { deliveryAddress } = order;
  //set local data from redux
  const [address, setAddress] = useState(deliveryAddress.address);
  const [city, setCity] = useState(deliveryAddress.city);
  const [country, setCountry] = useState(deliveryAddress.country);
  const [postIndex, setPostIndex] = useState(deliveryAddress.postIndex);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      saveDeliveryAddress({
        address,
        city,
        country,
        postIndex,
      })
    );
    navigate("/payment");
  };

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <DeliverySteps loginStep deliveryStep />
        <h1 className="fa-solid fa-truck"> Delivery to</h1>
        <Form.Group controlId="address">
          <Form.Label>Delivery address:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter delivery address"
            value={address ? address : ""}
            onChange={(event) => setAddress(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>Delivery city:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter delivery city"
            value={city ? city : ""}
            onChange={(event) => setCity(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Delivery country:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter delivery country"
            value={country ? country : ""}
            onChange={(event) => setCountry(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postIndex">
          <Form.Label>Delivery post index:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter delivery post index"
            value={postIndex ? postIndex : ""}
            onChange={(event) => setPostIndex(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" className="my-3" variant="success">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default DeliveryPage;
