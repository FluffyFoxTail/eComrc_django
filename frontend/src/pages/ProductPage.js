import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";

import { detailProductAction } from "../actions/productActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductPage = () => {
  // get data from redux
  const productDetails = useSelector((state) => state.productDetail);
  const { error, loading, product } = productDetails;

  // set selected count
  const [productCount, setProductCount] = useState(1);

  // get product id and dispatching it to store
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailProductAction(productId));
  }, [dispatch, productId]);

  // redirect to order page
  const navigate = useNavigate();
  const addToOrderHandler = () => {
    navigate(`/order/${productId}?count=${productCount}`);
  };

  return (
    <div>
      <Link to="/" className="btn btn-success my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>
            <Image src={product.image} alt={product.name} />
          </Col>

          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>

              <ListGroup.Item>Category: {product.category}</ListGroup.Item>

              <ListGroup.Item>Brand: {product.brand}</ListGroup.Item>
              <ListGroup.Item>
                Description:
                <br /> {product.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`from ${product.numReviews} reviews`}
                  color={"#093314"}
                />
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h3>Price:</h3>
                    </Col>
                    <Col>
                      <h4>${product.price}</h4>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h3>Availability:</h3>
                    </Col>
                    <Col>
                      <h4>{product.available ? "Yes" : "No"}</h4>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.available > 0 ? (
                  <ListGroup.Item>
                    <Row>
                      <Col>Count</Col>
                      <Col xs="auto">
                        <Form.Control
                          as="select"
                          value={productCount}
                          onChange={(e) => setProductCount(e.target.value)}
                        >
                          {[...Array(product.available).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ) : (
                  <br></br>
                )}

                <ListGroup.Item>
                  {product.available ? (
                    <Button
                      className="btn btn-warning btn-block"
                      type="button"
                      onClick={addToOrderHandler}
                    >
                      Add to Order
                    </Button>
                  ) : (
                    "Adding not available"
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductPage;
