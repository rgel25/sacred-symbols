import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader.component";
import Message from "../message/Message.component";
import { listTopProducts } from "../../store/products/productsActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Carousel pause="hover" variant="dark">
        {products.map((product) => (
          <Carousel.Item key={product._id} className="text-center">
            <Link to={`product/${product._id}`}>
              <img
                className="img-fluid"
                src={product.image}
                alt={product.name}
              />
              <Carousel.Caption>
                <h2 className="bg-light p-2 rounded border-white">
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
