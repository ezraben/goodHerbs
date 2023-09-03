import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
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
  const removeLikeProduct = (id) => {
    axios
      .put(
        `/products/removeLikedProductByUser?email=${logInUserEmail}&id=${id}`
      )
      .then(() => {
        getLikedProductsByUsers();

        toast.success("removed from your liked products", {
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
        toast.error("something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
          handleRemoveLikeProduct={removeLikeProduct}
          key={arr._id}
        />
      ))}
      {likedProductsArr < 1 && (
        <h1>
          {" "}
          your liked products will show up here after you will like them on all
          products page
        </h1>
      )}
    </div>
  );
};

export default LikedProductPage;
