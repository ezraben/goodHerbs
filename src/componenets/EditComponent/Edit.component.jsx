import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import AddProductValidation from "../../validation/AddProduct.validation";
import Joi from "joi-browser";

import editCss from "./editCss.css";

const EditComponent = (props) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [email, setEmail] = useState("");

  const handleProductNameChange = (ev) => {
    setProductName(ev.target.value);
    console.log(productName);
  };
  const handleProductPriceChange = (ev) => {
    setProductPrice(ev.target.value);
    console.log(productPrice);
  };
  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
    console.log(email);
  };

  const handleCancelClick = (ev) => {
    ev.stopPropagation();
    props.onCancelClick();
    console.log("hhhhhh");
  };
  const handleformClick = (ev) => {
    ev.stopPropagation();
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validateValue = Joi.validate(
      { productName, productPrice },
      AddProductValidation,
      { abortEarly: false }
    );
    const { error } = validateValue;
    if (error) {
      for (let i = 0; i < error.details.length; i++) {
        console.log(error.details[i].message);
        toast.error(error.details[i].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      axios
        .post("/products/addProduct", { productName, productPrice, email })
        .then((data) => {
          console.log("data from axios", data);
          toast.success(
            `🦄 woop woop ${productName} product added successfully!`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        })
        .catch((err) => {
          console.log("err from axios", err);
        });
    }
  };
  return (
    <div onClick={handleCancelClick} className="center-wrapper">
      {" "}
      <form
        onSubmit={handleSubmit}
        onClick={handleformClick}
        className="topSpaceFromNav form-group center-form "
      >
        <h1 className="text-center mt-5">Edit product</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputProductName1" className="form-label">
            Product Name
          </label>
          <input
            type="productName"
            className="form-control"
            id="exampleInputProductName1"
            aria-describedby="productNameHelp"
            onChange={handleProductNameChange}
            value={productName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPrice1" className="form-label">
            Product price
          </label>
          <input
            type="price"
            className="form-control"
            id="exampleInputprice1"
            onChange={handleProductPriceChange}
            value={productPrice}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPrice1" className="form-label">
            email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            onChange={handleEmailChange}
            value={email}
          />
        </div>

        <div className="text-center">
          <button className="btn btn-primary text-center m-5">Edit</button>
          <button
            onClick={handleCancelClick}
            className="btn btn-danger text-center m-5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComponent;
