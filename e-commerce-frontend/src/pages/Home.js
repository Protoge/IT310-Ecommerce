import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import axios from "../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  useEffect(() => {
    axios
      .get("/products")
      .then(({ data }) => dispatch(updateProducts(data)), []);
  });

  return (
    <div>
      <img
        src="https://res.cloudinary.com/dxrcubiuj/image/upload/v1682839182/flexwear_zves94.png"
        className="home-banner"
        alt=""
      />
      <div className="featured-products-container container mt-4">
        <h2>Latest products</h2>
        {/* last products here */}
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>
      </div>
      <div>
        <Link
          to="/category/all"
          style={{
            textAlign: "right",
            display: "block",
            textDecoration: "none",
          }}
        >
          See more {">>"}
        </Link>
      </div>
      {/* sale banner */}
      <div className="sale__banner--container mt-4">
        <img
          alt=""
          src="https://res.cloudinary.com/dxrcubiuj/image/upload/v1682839182/flexwear_zves94.png"
        ></img>
      </div>
      <div className="recent-products-contianer container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((category, idx) => (
            <LinkContainer
              key={idx}
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
