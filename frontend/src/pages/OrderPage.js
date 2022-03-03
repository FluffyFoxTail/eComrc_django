import React, { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import { addToOrder, removeFromOrder } from "../actions/orderItemsActions";
import Message from "../components/Message";

const OrderPage = () => {
  //get id
  const params = useParams();
  const productId = params.id;

  //get query path
  const location = useLocation();
  const count = location.search ? Number(location.search.split("=")[1]) : 1;

  // add updated count to order dict from redux-store
  const dispatch = useDispatch();

  // get set of ordered products
  const order = useSelector((state) => state.orderItems);
  const { orderItems } = order;

  useEffect(() => {
    if (productId) {
      dispatch(addToOrder(productId, count));
    }
  }, [dispatch, productId, count]);

  // trash icon handler
  const removeFromOrderHandler = (id) => {
    dispatch(removeFromOrder(id));
  };

  // checkout btn handler
  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/delivery");
  };
  return (
    <Row>
      <Col>
        <h1>Your current order:</h1>
        {orderItems.length === 0 ? (
          <Message variant="info">
            <h2>Your order is empty</h2>
            <Link to="/" className="btn btn-success my-3">
              Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {orderItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col>
                    <Image src={item.image} alt={item.name} thumbnail />
                  </Col>
                  <Col>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col>
                    <p>${item.price}</p>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={item.count}
                      onChange={(e) =>
                        dispatch(
                          addToOrder(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.available).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      variant="grey"
                      onClick={() => removeFromOrderHandler(item.product)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Itogo{" "}
                {`${orderItems.reduce((acc, item) => acc + item.count, 0)} `}
                items
              </h2>
              <h4>
                $
                {` ${orderItems.reduce(
                  (acc, item) => acc + item.count * item.price,
                  0
                )}`}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              {orderItems.length === 0 ? (
                "Checkout not available"
              ) : (
                <Button
                  className="btn btn-warning btn-block"
                  type="button"
                  onClick={checkoutHandler}
                >
                  Checkout order
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderPage;
