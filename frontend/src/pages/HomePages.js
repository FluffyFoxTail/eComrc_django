import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { nanoid } from "nanoid";

import { listProductsAction } from "../actions/productActions";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomePages = () => {
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductsAction());
  }, [dispatch]);

  return (
    <div>
      <h1>Lasets things</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={nanoid()}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePages;
