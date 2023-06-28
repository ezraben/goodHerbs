import axios from "axios";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import ProductCardComponent from "../ProductCard/ProductCard.component";
import { log } from "joi-browser";

const AllProductsComponent = (props) => {
  const [arrOfProducts, setArrOfProducts] = useState([]);
  const [logInUserEmail, setLogInUserEmail] = useState(
    localStorage.getItem("userEmail")
  );
  // const [arrOfLikedProductId, setArrOfLikedProductId] = useState([]);
  // const [likeMsgToPass, setLikeMsgToPass] = useState(false);

  useEffect(() => {
    // console.log("arrOfProducts-- productName--arrOfCards ", arrOfProducts);
  }, [arrOfProducts]);
  useEffect(() => {
    handleGetAllCardsClick();
  }, []);
  // useEffect(() => {
  //   console.log(
  //     "uzse arrOfLikedProductId",
  //     arrOfLikedProductId,
  //     "------setProductId"
  //     //  setProductId
  //   );
  // }, [arrOfLikedProductId]);
  // useEffect(() => {}, [arrOfLikedProductId]);
  // useEffect(() => {
  //   // ShowLikedProducts();
  //   console.log("likeMsgToPass", likeMsgToPass);
  // }, [likeMsgToPass]);

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
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // const ShowLikedProducts = (id) => {
  //   axios
  //     .get(`/users/showLikedProductsByUser?email=${logInUserEmail}`)
  //     .then((data) => {
  //       setArrOfLikedProductId(data.data);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  //   for (let i = 0; i < arrOfLikedProductId.length; i++) {
  //     if (arrOfLikedProductId[i] === id) {
  //       setLikeMsgToPass(true);
  //     }
  //   }
  // };

  return (
    <div className="rows">
      {arrOfProducts.map((arr) => (
        <ProductCardComponent
          setProductName={arr.productName}
          setProductPrice={arr.productPrice}
          setProductQuantity={arr.productQuantity}
          setProductId={arr._id}
          handleBuyProductClick={buyClick}
          // invocLikeProduct={ShowLikedProducts}
          // handleLikeMsg={likeMsgToPass}
          key={arr._id}
        />
      ))}
    </div>
  );
};

export default AllProductsComponent;
