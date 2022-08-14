import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/product/Product.component";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/products/productsActions";
import Message from "../../components/message/Message.component";
import Loader from "../../components/loader/Loader.component";
import Paginate from "../../components/paginate/Paginate.component";
import { useParams, Link } from "react-router-dom";
import ProductCarousel from "../../components/product-carousel/ProductCarousel.component";

export default function HomeScreen() {
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;
  const dispatch = useDispatch();
  const { products, pages, page, loading, error } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(fetchProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      {keyword ? (
        <>
          <h2>Displaying search results for "{keyword}" </h2>
          <Link to="/" className="btn btn-primary mb-3">
            Go Back
          </Link>
        </>
      ) : (
        <>
          <h2 className="text-center">Top rated products</h2>
          <ProductCarousel />
          <h2>Latest Products</h2>
        </>
      )}
      {products.length === 0 || (loading && <h3>No product found...</h3>)}

      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })
        )}
      </Row>
      <Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
      </Row>
    </>
  );
}
