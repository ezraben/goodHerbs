import { useEffect, useState } from "react";
import productCss from "./productCss.css";
import axios from "axios";
import { toast } from "react-toastify";
import { CashCoin, Pencil, Trash } from "react-bootstrap-icons";

const ProductCardComponent = ({
  setProductName,
  setProductPrice,
  setProductQuantity,
  setProductId,
  handleDeleteProduct,
  handleShowEditProduct,
  handleBuyProductClick,
  handleRemoveLikeProduct,

  handleLikeMsg,

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
        console.log("data", data);
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

        axios.put(
          `/products/addUserToWhoLikeProduct?id=${setProductId}&email=${logInUserEmail}`
        );
        toast.success(`🦄 you liked this product `, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
  };

  const onBuy = () => {
    handleBuyProductClick(setProductId);
  };

  const onInputLikeClick = (ev) => {
    setLikeInput(ev.target.checked);
    getLikedProductsByUsers();
  };
  const removeLikeProductClick = () => {
    handleRemoveLikeProduct(setProductId);
  };

  return (
    <div onClick={clickOnCard} className="product">
      {likedMsg && <h1 className="colorRed">you liked this product</h1>}

      <div>
        <h1>
          {" "}
          product name: <span className="text-primary">{setProductName}</span>
        </h1>
      </div>
      <div className="mb-3">
        <h2>
          {" "}
          product price: <span className="text-success">
            {setProductPrice}
          </span>{" "}
        </h2>
      </div>
      <div className="mb-3">
        <h2>
          {" "}
          product quantity:{" "}
          {setProductQuantity < 4 ? (
            <span className="text-danger">{setProductQuantity}</span>
          ) : (
            <span className="text-primary">{setProductQuantity}</span>
          )}{" "}
        </h2>
      </div>

      {window.location.pathname === "/dash" && (
        <div className="buttonContainer">
          <button onClick={onDelete} className="btn btn-danger">
            Delete Product <Trash />
          </button>
          <button onClick={showEditClick} className="btn btn-warning">
            Edit Product {""}
            <Pencil />
          </button>
        </div>
      )}
      {window.location.pathname === "/AllProductsComponent" &&
        setProductQuantity > 0 && (
          <div className="buttonContainer mb-3">
            <button onClick={onBuy} className="btn btn-primary">
              Buy product
              {""} <CashCoin />
            </button>
          </div>
        )}
      {window.location.pathname === "/AllProductsComponent" &&
        setProductQuantity <= 0 && (
          <div className="buttonContainer">
            <h2 className="text-warning"> product out of stock {""}</h2>
          </div>
        )}
      {window.location.pathname === "/AllProductsComponent" &&
        likedMsg === false && (
          <div>
            <input
              type="checkbox"
              name=""
              id=""
              onChange={onInputLikeClick}
              value={likeInput}
            />
            <span> check the box to like the property</span>
          </div>
        )}
      {window.location.pathname === "/LikedProductPage" && (
        <div>
          <button onClick={removeLikeProductClick} className="btn btn-danger">
            Remove from liked products <Trash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCardComponent;
