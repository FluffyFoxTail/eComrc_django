import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product.id}`}> <Card.Img src={product.image} /></Link>
  
      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Card.Text>
          <Rating
            value={product.rating}
            text={`from ${product.numReviews} reviews`}
            color={"#093314"}
          />
        </Card.Text>

        <Card.Text>
          <h3>${product.price}</h3>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
