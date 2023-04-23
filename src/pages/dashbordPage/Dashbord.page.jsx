import axios from "axios";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";

import ProductCardComponent from "../../componenets/ProductCard/ProductCard.component";
import EditComponent from "../../componenets/EditComponent/Edit.component";

const Dashbordpage = () => {
  const [email, setEmail] = useState("e@w.com");
  const [arrOfProducts, setArrOfProducts] = useState([]);

  const [showEditComp, setShowEditComp] = useState(false);

  useEffect(() => {}, [arrOfProducts]);
  useEffect(() => {
    getCards();
  }, []);

  const getCards = () => {
    axios
      .get(`/products/allProductsByUser?email=${email}`)
      .then((data) => {
        setArrOfProducts(data.data);
        console.log("arrPfProducts", arrOfProducts);
      })
      .catch((err) => {
        console.log("err from axios", err);
      });
  };
  const deleteProduct = (id) => {
    axios
      .delete(`/products/removeProduct?id=${id}`)
      .then((data) => {
        let copyArrOfProducts = cloneDeep(arrOfProducts);

        let productIndex = copyArrOfProducts.findIndex(
          (item) => item._id === id
        );
        // console.log("copyArrOfProducts", copyArrOfProducts);
        console.log("productIndex", productIndex);
        if (productIndex > -1) {
          copyArrOfProducts.splice(productIndex);
          console.log("copyArrOfProducts", copyArrOfProducts);
          setArrOfProducts(copyArrOfProducts);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const editProduct = () => {
    setShowEditComp(true);
  };
  const onCancel = (ev) => {
    // ev.stopPropagation();
    setShowEditComp(false);
  };
  return (
    <div className="container">
      {/* <button onClick={getCards}>dashbosd Cards</button> */}
      {arrOfProducts.map((arr) => (
        <ProductCardComponent
          setProductId={arr._id}
          setProductName={arr.productName}
          setProductPrice={arr.productPrice}
          handleDeleteProduct={deleteProduct}
          handleEditProduct={editProduct}
          key={arr._id}
        />
      ))}
      {showEditComp && <EditComponent onCancelClick={onCancel} />}
    </div>
  );
};

export default Dashbordpage;
