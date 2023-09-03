import axios from "axios";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import ProductCardComponent from "../ProductCard/ProductCard.component";
import { log } from "joi-browser";
import allProductsCss from "./allProductsCss.css";

const AllProductsComponent = (props) => {
  const [arrOfProducts, setArrOfProducts] = useState([]);
  const [logInUserEmail, setLogInUserEmail] = useState(
    localStorage.getItem("userEmail")
  );
  const [arrOfLikedProductId, setArrOfLikedProductId] = useState([]);
  const [likeMsgToPass, setLikeMsgToPass] = useState(false);

  const [productName, setProductName] = useState("");
  const [productMinPrice, setProductMinPrice] = useState("");
  const [productMaxPrice, setProductMaxPrice] = useState("");
  const [arrOfFilteredProducts, setArrOfFilteredProducts] = useState([]);
  const [filterMsgStart, setFilterMsgStart] = useState(true);
  const [noResultFilterMsg, setNoResultFilterMsg] = useState(false);
  useEffect(() => {
    console.log("using the effect", arrOfFilteredProducts);
  }, [arrOfFilteredProducts]);

  const [showFilterOptionComp, setShowFilterOptionComp] = useState(false);

  useEffect(() => {}, [arrOfProducts]);
  useEffect(() => {
    handleGetAllCardsClick();
  }, []);
  useEffect(() => {
    console.log(
      "uzse arrOfLikedProductId",
      arrOfLikedProductId,
      "------setProductId"
    );
  }, [arrOfLikedProductId]);
  useEffect(() => {}, [arrOfLikedProductId]);
  useEffect(() => {
    ShowLikedProducts();
    console.log("likeMsgToPass", likeMsgToPass);
  }, [likeMsgToPass]);

  useEffect(() => {
    if (arrOfFilteredProducts.length > 0) {
      setNoResultFilterMsg(false);
    }
    if (arrOfFilteredProducts.length === 0) {
      setNoResultFilterMsg(true);
    }
  }, [arrOfFilteredProducts.length]);

  const showFiltersBtnClick = () => {
    setShowFilterOptionComp(true);
    setFilterMsgStart(true);
    setNoResultFilterMsg(false);
  };
  const hideFiltersBtnClick = () => {
    setShowFilterOptionComp(false);
  };

  const handleGetAllCardsClick = () => {
    axios
      .get("/products")
      .then((data) => {
        setArrOfProducts(data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const buyClick = (setProductId) => {
    axios
      .put(`/products/decreaseProductQuantity?id=${setProductId}`)
      .then((data) => {
        toast.success(`🦄 you bot the product!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleGetAllCardsClick();
        if (productName.length > 0) {
          handleGetProductByNameClick();
        }
        if (productMinPrice.length > 0) {
          getProductsByMinPrice();
        }
        if (productMaxPrice.length > 0) {
          getProductsByMaxPrice();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const ShowLikedProducts = (id) => {
    axios
      .get(`/users/showLikedProductsByUser?email=${logInUserEmail}`)
      .then((data) => {
        setArrOfLikedProductId(data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    for (let i = 0; i < arrOfLikedProductId.length; i++) {
      if (arrOfLikedProductId[i] === id) {
        setLikeMsgToPass(true);
      }
    }
  };

  const handleProductNameChange = (ev) => {
    setProductName(ev.target.value);
  };
  const handleProductMinPriceChange = (ev) => {
    setProductMinPrice(ev.target.value);
  };

  const handleProductMaxPriceChange = (ev) => {
    setProductMaxPrice(ev.target.value);
  };

  const handleGetProductByNameClick = () => {
    axios
      .post(`/products/searchProductByName`, { productName })
      .then((data) => {
        setArrOfFilteredProducts(data.data);
        console.log("arrOfFilteredProducts", arrOfFilteredProducts);
        setProductMaxPrice("");
        setProductMinPrice("");
        setFilterMsgStart(false);

        if (arrOfFilteredProducts.length === 0) {
          setNoResultFilterMsg(true);
        }
        if (arrOfFilteredProducts.length > 0) {
          setNoResultFilterMsg(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getProductsByMinPrice = () => {
    axios
      .post(`/products/filterProductByMinPrice`, { productMinPrice })
      .then((data) => {
        console.log("data", data);
        setArrOfFilteredProducts(data.data);
        console.log("arrOfFilteredProducts", arrOfFilteredProducts);
        setProductMaxPrice("");
        setProductName("");
        setFilterMsgStart(false);
        if (arrOfFilteredProducts.length === 0) {
          setNoResultFilterMsg(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getProductsByMaxPrice = () => {
    axios
      .post(`/products/filterProductByMaxPrice`, { productMaxPrice })
      .then((data) => {
        console.log("data", data);
        setArrOfFilteredProducts(data.data);
        console.log("arrOfFilteredProducts", arrOfFilteredProducts);
        setProductName("");
        setProductMinPrice("");
        setFilterMsgStart(false);
        if (arrOfFilteredProducts.length === 0) {
          setNoResultFilterMsg(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="filters  ">
      {showFilterOptionComp === false && (
        <div className="d-flex justify-content-center">
          <button
            onClick={showFiltersBtnClick}
            className="btn btn-primary mb-5  "
          >
            show filter options
          </button>
        </div>
      )}
      {showFilterOptionComp === true && (
        <div className="">
          <div className="d-flex justify-content-center">
            <button onClick={hideFiltersBtnClick} className="btn btn-danger  ">
              hide filter options
            </button>
          </div>
          <div className="centerFilters">
            <div>
              <label htmlFor="exampleInputProductName1" className="form-label ">
                Product Name
              </label>
              <input
                type="productName"
                className="form-control "
                id="exampleInputProductName1"
                aria-describedby="productNameHelp"
                onChange={handleProductNameChange}
                value={productName}
              />
              <button onClick={handleGetProductByNameClick}>filter</button>
            </div>
            <div>
              <label htmlFor="exampleInputProductName1" className="form-label">
                filter by min price
              </label>
              <input
                type="productMinPrice"
                className="form-control"
                id="exampleInputProductName1"
                aria-describedby="productNameHelp"
                onChange={handleProductMinPriceChange}
                value={productMinPrice}
              />
              <button onClick={getProductsByMinPrice}> filter</button>
            </div>
            <div>
              <label htmlFor="exampleInputProductName1" className="form-label">
                Product max price
              </label>
              <input
                type="productMaxPrice"
                className="form-control"
                id="exampleInputProductName1"
                aria-describedby="productNameHelp"
                onChange={handleProductMaxPriceChange}
                value={productMaxPrice}
              />
              <button onClick={getProductsByMaxPrice}>filter</button>
            </div>
            {
              <div className="row mb-5">
                {arrOfFilteredProducts.map((arr) => (
                  <ProductCardComponent
                    setProductName={arr.productName}
                    setProductPrice={arr.productPrice}
                    setProductQuantity={arr.productQuantity}
                    setProductId={arr._id}
                    handleBuyProductClick={buyClick}
                    invocLikeProduct={ShowLikedProducts}
                    handleLikeMsg={likeMsgToPass}
                    key={arr._id}
                  />
                ))}
              </div>
            }
          </div>
          {filterMsgStart === true && (
            <h1 className="text-center">Search for a product</h1>
          )}
          {noResultFilterMsg === true && (
            <h1 className="text-center">No Product Found</h1>
          )}
        </div>
      )}

      {showFilterOptionComp === false && (
        <div className="rows">
          {arrOfProducts.map((arr) => (
            <ProductCardComponent
              setProductName={arr.productName}
              setProductPrice={arr.productPrice}
              setProductQuantity={arr.productQuantity}
              setProductId={arr._id}
              handleBuyProductClick={buyClick}
              invocLikeProduct={ShowLikedProducts}
              handleLikeMsg={likeMsgToPass}
              key={arr._id}
            />
          ))}
          {arrOfProducts.length < 1 && (
            <h1>products will show up here after users will create them</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProductsComponent;
