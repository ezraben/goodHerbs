import { useEffect, useState } from "react";
import productCss from "./productCss.css";
import axios from "axios";

const ProductCardComponent = ({
  setProductName,
  setProductPrice,
  setProductQuantity,
  setProductId,
  handleDeleteProduct,
  handleShowEditProduct,
  handleBuyProductClick,

  // handleLikeMsg,

  editProductId,
  productIdFromClickOnCard,
}) => {
  const [likeInput, setLikeInput] = useState("");
  const [likedMsg, setLikedMsg] = useState(false);
  const [likedProductsArr, setLikedProductsArr] = useState([]);

  const [logInUserEmail, setLogInUserEmail] = useState(
    localStorage.getItem("userEmail")
  );

  useEffect(() => {}, []);
  useEffect(() => {
    getLikedProductsByUsers();
  }, []);
  useEffect(() => {
    showLikedMsg();
  }, [likedProductsArr]);

  const getLikedProductsByUsers = () => {
    axios
      .get(`/users/showLikedProductsByUser?email=${logInUserEmail}`)
      .then((data) => {
        setLikedProductsArr(data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const showLikedMsg = () => {
    if (likedProductsArr.length > 0) {
      for (let i = 0; i <= likedProductsArr.length; i++) {
        if (likedProductsArr[i] === setProductId) {
          setLikedMsg(true);
        }
      }
    }
  };

  const pushLikedPropertyToArry = () => {
    axios
      .put(
        `/products/addLikedPropertyByUser?email=${logInUserEmail}&id=${setProductId}`
      )
      .then((data) => {
        console.log("data", data);
      })
      .catch((err) => {
        console.log(err, err);
      });
  };
  useEffect(() => {
    if (likeInput === true) {
      pushLikedPropertyToArry();
    }
  }, [likeInput]);
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
    handleShowEditProduct(
      setProductId,
      setProductName,
      setProductPrice,
      setProductQuantity
    );

    console.log("click");
  };

  const onBuy = () => {
    handleBuyProductClick(setProductId);
  };

  const onInputLikeClick = (ev) => {
    setLikeInput(ev.target.checked);
    getLikedProductsByUsers();
  };

  return (
    <div onClick={clickOnCard} className="product">
      {likedMsg && <h1>you liked this product</h1>}

      <div className="mb-3">
        {/* <button onClick={getLikedProductsByUsers}>
          getLikedProductsByUsers
        </button> */}
        <h1> product name: {setProductName}</h1>
      </div>
      <div className="mb-3">
        <h2> product price: {setProductPrice} </h2>
      </div>
      <div className="mb-3">
        <h2> product quantity: {setProductQuantity} </h2>
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
      {window.location.pathname === "/AllProductsComponent" &&
        setProductQuantity > 0 && (
          <div className="buttonContainer">
            <button onClick={onBuy} className="btn btn-primary">
              Buy product
            </button>
          </div>
        )}
      {window.location.pathname === "/AllProductsComponent" &&
        setProductQuantity <= 0 && (
          <div className="buttonContainer">
            <h2> product out of stock</h2>
          </div>
        )}
      {window.location.pathname === "/AllProductsComponent" && (
        <div>
          <input
            type="checkbox"
            name=""
            id=""
            onChange={onInputLikeClick}
            value={likeInput}
          />
          <span>check the box to like the property</span>
        </div>
      )}
      {window.location.pathname === "/LikedProductPage" && (
        <div>
          <button className="btn btn-danger">remove </button>
        </div>
      )}
    </div>
  );
};

export default ProductCardComponent;
