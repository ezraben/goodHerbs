import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ProductCardComponent from "../../componenets/ProductCard/ProductCard.component";

const LikedProductPage = () => {
  const [logInUserEmail, setLogInUserEmail] = useState(
    localStorage.getItem("userEmail")
  );
  const [likedProductsArr, setLikedProductsArr] = useState([]);

  useEffect(() => {
    getLikedProductsByUsers();
  }, []);

  const getLikedProductsByUsers = () => {
    axios
      .get(`/users/getLikedProductsArrByUser?email=${logInUserEmail}`)
      .then((data) => {
        setLikedProductsArr(data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  console.log("likedProductsArr", likedProductsArr);

  return (
    <div className="rows">
      {likedProductsArr.map((arr) => (
        <ProductCardComponent
          setProductName={arr.productName}
          setProductPrice={arr.productPrice}
          setProductQuantity={arr.productQuantity}
          setProductId={arr._id}
          // invocLikeProduct={ShowLikedProducts}
          // handleLikeMsg={likeMsgToPass}
          key={arr._id}
        />
      ))}
    </div>
  );
};

export default LikedProductPage;
