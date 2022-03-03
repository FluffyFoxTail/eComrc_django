import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Image,  ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { createOrderAction } from "../actions/orderActions";
//import { saveDeliveryAddress } from "../actions/orderItemsActions";
import DeliverySteps from "../components/DeliverySteps";

import Message from "../components/Message";

const PlaceOrderPage = () => {
  const orderItems = useSelector((state) => state.orderItems);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      navigate(`/myorders/${order.id}`);
      dispatch({ type: "ORDER_CREATE_RESET" });
    }
  }, [success, navigate, order, dispatch]);
  orderItems["itemPrice"] = orderItems.orderItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  ); 

  if (!orderItems.paymentMethod) {
    navigate("/payment");
  }
  // it is simple logic for build delivery tax, to be honest I don't know how to count it
  orderItems["deliveryPrice"] = Number(
    orderItems.itemPrice > 100 ? 20 : 40
  ).toFixed(2);

  orderItems["taxesPrice"] = Number(0.2 * orderItems.itemPrice).toFixed(2);

  orderItems["totalPrice"] = Number(
    Number(orderItems.itemPrice) +
      Number(orderItems.deliveryPrice) +
      Number(orderItems.taxesPrice)
  ).toFixed(2);

  const btnHandler = () => {
    dispatch(
      createOrderAction({
        orderItems: orderItems.orderItems,
        deliveryAddress: orderItems.deliveryAddress,
        paymentMethod: orderItems.paymentMethod,
        itemPrice: orderItems.itemPrice,
        taxesPrice: orderItems.taxesPrice,
        deliveryPrice: orderItems.deliveryPrice,
        totalPrice: orderItems.totalPrice,
      })
    );
  };
  return (
    <div>
      <DeliverySteps loginStep deliveryStep paymentStep placeOrderStep />
      <Row>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>DELIVERY</h2>
              <p>
                {`Delivery: ${orderItems.deliveryAddress.address}, 
                ${orderItems.deliveryAddress.city} 
                ${orderItems.deliveryAddress.country} 
                ${orderItems.deliveryAddress.postIndex}`}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>{`Method: ${orderItems.paymentMethod}`}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>
              {orderItems.orderItems.length === 0 ? (
                <Message variant="info">Your order is empty :(</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderItems.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col>
                          <Image src={item.image} alt={item.name} thumbnail />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`} alt={item.name}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col>
                          {item.count} x {item.price} = $
                          {` ${item.count * item.price}`}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>ORDER SUMMARY</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Item:</Col>
                <Col>${orderItems.itemPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Delivery:</Col>
                <Col>${orderItems.deliveryPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Taxes:</Col>
                <Col>${orderItems.taxesPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>${orderItems.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="my-3"
                disabled={orderItems.orderItems.length === 0}
                onClick={btnHandler}
              >
                Complete Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;
