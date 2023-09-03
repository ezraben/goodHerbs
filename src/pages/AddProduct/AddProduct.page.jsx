import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import AddProductValidation from "../../validation/AddProduct.validation";
import Joi from "joi-browser";
import auth from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const userData = useSelector((store) => store.auth.userData);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));

  const navigate = useNavigate();

  const handleProductNameChange = (ev) => {
    setProductName(ev.target.value);
  };
  const handleProductPriceChange = (ev) => {
    setProductPrice(ev.target.value);
  };
  const handleProductquantityChange = (ev) => {
    setProductQuantity(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validateValue = Joi.validate(
      { productName, productPrice, productQuantity, email },
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
        .post("/products/addProduct", {
          productName,
          productPrice,
          productQuantity,
          email,
        })
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
          navigate("/dash");
        })
        .catch((err) => {
          console.log("err from axios", err);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="topSpaceFromNav form-group w-50 "
      >
        <h1 className="text-center mt-5">Add product</h1>
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
            Product quantity
          </label>
          <input
            type="price"
            className="form-control"
            id="exampleInputprice1"
            onChange={handleProductquantityChange}
            value={productQuantity}
          />
        </div>

        <div className="text-center">
          <button className="btn btn-primary text-center m-5">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
