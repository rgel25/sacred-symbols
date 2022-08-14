import React from "react";
import { Card } from "react-bootstrap";
import "./Product.styles.scss";
import Rating from "../rating/Rating.component";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  const { _id: id, image, name, rating, numReviews, price } = product;
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${id}`}>
        <Card.Img src={image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${id}`} className="text-decoration-none fw-bold">
          <Card.Title as="div">{name}</Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating value={rating} text={` from ${numReviews} reviews`} />
          </div>
        </Card.Text>
        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
