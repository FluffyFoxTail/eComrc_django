import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getOrderAction } from "../actions/orderActions";

import Loader from "../components/Loader";
import Message from "../components/Message";

const PlaceOrderPage = () => {
  const params = useParams();
  const orderId = params.id;

  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, error, loading } = orderDetail;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!order) {
      dispatch(getOrderAction(orderId));
    }
  }, [dispatch, order, orderId]);

  console.log(order);

  if (!loading && !error) {
    order["itemPrice"] = order.order_items.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
  }
  //have mistake in "payment_methond" it s
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <h1>Order #: {order.id}</h1>
          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>DELIVERY</h2>
                <p>Name: {order.user.name}</p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  {`Delivery: ${order.delivery_address.address}, 
            ${order.delivery_address.city} 
            ${order.delivery_address.country} 
            ${order.delivery_address.postIndex}`}
                  {order.is_delivered ? (
                    <Message variant="success">
                      Delevered at {order.delevered_at}
                    </Message>
                  ) : (
                    <Message variant="warning">Not delevered now</Message>
                  )}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>PAYMENT METHOD</h2>
                <p>{`Method: ${order.payment_methond}`}</p>
                {order.is_paid ? (
                  <Message variant="success">
                    On paid at {order.paid_at}
                  </Message>
                ) : (
                  <Message variant="warning">Not paid now</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>ORDER ITEMS</h2>
                {order.order_items.length === 0 ? (
                  <Message variant="info">Order is empty :(</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.order_items.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col>
                            <Image src={item.image} alt={item.name} thumbnail />
                          </Col>
                          <Col>
                            <Link
                              to={`/product/${item.product}`}
                              alt={item.name}
                            >
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
                  <Col>${order.itemPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Delivery:</Col>
                  <Col>${order.delivery_price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Taxes:</Col>
                  <Col>${order.taxes_price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.total_price}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PlaceOrderPage;
