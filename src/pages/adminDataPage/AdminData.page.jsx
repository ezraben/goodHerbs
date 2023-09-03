import axios from "axios";
import { useEffect, useState } from "react";
import ProductCardComponent from "../../componenets/ProductCard/ProductCard.component";
import AdminDataComponent from "../../componenets/adminDataComponent/AdminData.component";

const AdminDataPage = () => {
  const [userEmail] = useState(localStorage.getItem("userEmail"));
  const [arrOfProductsAndWhoLikeThem, setArrOfProductsAndWhoLikeThem] =
    useState([]);

  useEffect(() => {
    getAllUsersWhoLikeProduct();
  }, []);

  const getAllUsersWhoLikeProduct = () => {
    axios
      .get(`/products/showToAdminWhoLikedProduct?userEmail=${userEmail}`)
      .then((data) => {
        setArrOfProductsAndWhoLikeThem(data.data);
        console.log("arrOfProductsAndWhoLikeThem", arrOfProductsAndWhoLikeThem);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="container">
      {arrOfProductsAndWhoLikeThem.map((arr) => (
        <AdminDataComponent
          key={arr.productName}
          productName={arr.productName}
          //
          whoLiked={arr.likedByArr.map((arr) => arr.email)}
        />
      ))}
      {arrOfProductsAndWhoLikeThem.length < 1 && (
        <h1>you have not created any products yes</h1>
      )}
    </div>
  );
};

export default AdminDataPage;
