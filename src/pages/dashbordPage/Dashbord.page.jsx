import axios from "axios";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";

import { useSelector } from "react-redux";

import ProductCardComponent from "../../componenets/ProductCard/ProductCard.component";
import EditComponent from "../../componenets/EditComponent/Edit.component";

const Dashbordpage = (props) => {
  const isLogin = useSelector((store) => store.auth.loggedIn);
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [arrOfProducts, setArrOfProducts] = useState([]);

  const [showEditComp, setShowEditComp] = useState(false);
  const [idForEdit, setIdForEdit] = useState("");
  const [nameForEdit, setNameForEdit] = useState("");
  const [priceForEdit, setPriceForEdit] = useState("");
  const [quantityForEdit, setQuantityForEdit] = useState("");

  const editProduct = (id, name, price, quantity) => {
    setShowEditComp(true);
    setIdForEdit(id);
    setNameForEdit(name);
    setPriceForEdit(price);
    setQuantityForEdit(quantity);
  };

  const onEditDone = () => {
    setShowEditComp(false);
    getCards();
  };
  const onCancel = (ev) => {
    setShowEditComp(false);
  };

  useEffect(() => {
    console.log("arrPfProducts", arrOfProducts);
  }, [arrOfProducts]);

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

        console.log("productIndex", productIndex);
        if (productIndex > -1) {
          copyArrOfProducts.splice(productIndex);
          console.log("copyArrOfProducts", copyArrOfProducts);
          setArrOfProducts(copyArrOfProducts);
        }
        getCards();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="container">
      {arrOfProducts.map((arr) => (
        <ProductCardComponent
          setProductId={arr._id}
          setProductName={arr.productName}
          setProductPrice={arr.productPrice}
          setProductQuantity={arr.productQuantity}
          handleDeleteProduct={deleteProduct}
          handleShowEditProduct={editProduct}
          key={arr._id}
        />
      ))}
      {showEditComp && (
        <EditComponent
          id={idForEdit}
          name={nameForEdit}
          price={priceForEdit}
          quantity={quantityForEdit}
          cancel={onCancel}
          edit={onEditDone}
        />
      )}
    </div>
  );
};

export default Dashbordpage;
