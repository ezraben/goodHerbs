import axios from "axios";
import { toast } from "react-toastify";

import AddProductValidation from "../../validation/AddProduct.validation";
import Joi from "joi-browser";
import auth from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";

import editCss from "./editCss.css";
import { useState } from "react";
const EditComponent = (props) => {
  const [id, setId] = useState(props.id);
  const [productName, setProductName] = useState(props.name);
  const [productPrice, setProductPrice] = useState(props.price);
  const [productQuantity, setProductQuantity] = useState(props.quantity);
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));

  const handleProductNameChange = (ev) => {
    setProductName(ev.target.value);
    console.log(productName);
  };
  const handleProductPriceChange = (ev) => {
    setProductPrice(ev.target.value);
  };
  const handleProductQuantityChange = (ev) => {
    setProductQuantity(ev.target.value);
  };
  const editDone = () => {
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
    }

    axios
      .put(
        `products/editProduct?id=${props.id}&productName=${productName}&productPrice=${productPrice}&productQuantity=${productQuantity}&email=${email}`
      )
      .then((data) => {
        console.log("data from axios", data);
        if (data.data.status === "Success") {
          toast.success(`🦄 woop woop product was edited successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        props.edit();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="product center-wrapper">
      <h1 className="text-center mt-5">Edit product</h1>
      <div className="center-form">
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
            Product Quantity
          </label>
          <input
            type="Quantity"
            className="form-control"
            id="exampleInputprice1"
            onChange={handleProductQuantityChange}
            value={productQuantity}
          />
        </div>

        <div className="mb-3">
          <h2> product id:{props.id} </h2>
        </div>
        <div className="buttonContainer">
          <button onClick={editDone} className="btn btn-warning">
            Edit Product
          </button>
          <button onClick={props.cancel} className="btn btn-danger">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditComponent;
