import { useEffect, useState } from "react";
import productCss from "./productCss.css";
import axios from "axios";

const ProductCardComponent = ({
  setProductName,
  setProductPrice,
  setProductId,
  handleDeleteProduct,
  handleShowEditProduct,
  editProductId,
  productIdFromClickOnCard,
}) => {
  const clickOnCard = (id) => {
    console.log("id:", setProductId);

    axios
      .get(`/products/findProductById?id=${setProductId}`)
      .then((data) => {
        console.log("card detils", data.data);
      })
      .catch((err) => {
        console.log("err from axiosssssss", err);
      });
  };

  const onDelete = () => {
    handleDeleteProduct(setProductId);
  };
  const showEditClick = () => {
    handleShowEditProduct(setProductId, setProductName, setProductPrice);

    // productIdFromClickOnCard(setProductId);
    console.log("click");
    // handleShowEditProduct(setProductId);
  };

  return (
    <div onClick={clickOnCard} className="product">
      <div className="mb-3">
        <h1> product name: {setProductName}</h1>
      </div>
      <div className="mb-3">
        <h2> product price: {setProductPrice} </h2>
      </div>

      {window.location.pathname === "/dash" && (
        <div className="buttonContainer">
          <button onClick={onDelete} className="btn btn-danger">
            Delete Product
          </button>
          <button onClick={showEditClick} className="btn btn-warning">
            Edit Product
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCardComponent;
