import React, { useEffect, useState } from "react";
import "./NewProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../services/appApi";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import axios from "../services/axios";

const EditProductPage = () => {
  const { id } = useParams();
  const [productInfo, setproductInfo] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });
  const navigate = useNavigate();
  const [imgToRemove, setImgToRemove] = useState(null);

  const [updateProduct, { isError, isLoading, error, isSuccess }] =
    useUpdateProductMutation();

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then(({ data }) => {
        const product = data.product;
        setproductInfo({
          ...productInfo,
          name: product.name,
          description: product.description,
          category: product.category,
          images: product.pictures,
          price: product.price,
        });
      })
      .catch((e) => console.log(e));
  }, [id, productInfo]);

  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dxrcubiuj",
        uploadPreset: "povinpbq",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setproductInfo({
            ...productInfo,
            images: [
              ...productInfo.images,
              { url: result.info.url, public_id: result.info.public_id },
            ],
          });
        }
      }
    );
    widget.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !productInfo.name ||
      !productInfo.description ||
      !productInfo.price ||
      !productInfo.category
    ) {
      return alert("Please fill out all the fields");
    }

    updateProduct({
      id,
      name: productInfo.name,
      description: productInfo.description,
      price: productInfo.price,
      category: productInfo.category,
      images: productInfo.images,
    }).then(({ data }) => {
      if (data.length > 0) {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    });
  };

  const handleRemoveImg = (imgObj) => {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}`)
      .then((res) => {
        setImgToRemove(null);
        setproductInfo({
          ...productInfo,
          images: productInfo.images.filter(
            (img) => img.public_id !== imgObj.public_id
          ),
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1>Edit product</h1>
            {isSuccess && <Alert variant="success">Product updated</Alert>}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={productInfo.name}
                required
                onChange={(e) =>
                  setproductInfo({ ...productInfo, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product description"
                style={{ height: "100px" }}
                value={productInfo.description}
                required
                onChange={(e) =>
                  setproductInfo({
                    ...productInfo,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price ($)"
                value={productInfo.price}
                required
                onChange={(e) =>
                  setproductInfo({ ...productInfo, price: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              onChange={(e) =>
                setproductInfo({ ...productInfo, category: e.target.value })
              }
            >
              <Form.Label>Category</Form.Label>

              {/* ADD DIFFERENT CATEGORIES */}
              <Form.Select value={productInfo.category}>
                <option disabled selected>
                  {" "}
                  -- Select One --{" "}
                </option>
                <option value="technology">technology</option>
                <option value="tablets">tablets</option>
                <option value="phones">phones</option>
                <option value="laptops">laptops</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-preview-container">
                {productInfo.images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} alt="img" />
                    {/* add icon for removing */}
                    {imgToRemove !== image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                Update Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
};

export default EditProductPage;
