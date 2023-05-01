import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../services/axios";
import { updateProducts } from "../features/productSlice";
import "./DashboardProducts.css";
import { useDeleteProductMutation } from "../services/appApi";

const DashboardProducts = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios
      .get("/products")
      .then(({ data }) => dispatch(updateProducts(data)), []);
  });
  // removing the product
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure?"))
      deleteProduct({ product_id: id, user_id: user._id });
  };
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th></th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr>
            <td>
              <img
                alt=""
                src={product.pictures[0].url}
                className="dashboard-product-preview"
              />
            </td>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <Button
                onClick={() => handleDeleteProduct(product._id, user._id)}
                disabled={isLoading}
              >
                Delete
              </Button>
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-warning"
              >
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DashboardProducts;
