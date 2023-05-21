////////////////////////////////////////////////
//from here  works delete from DB - not state yet and get card id but  the function where on productPage from here im trying to  move the functions to this page  so it also befor changes on that page
import axios from "axios";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import ProductCardComponent from "../ProductCard/ProductCard.component";
import allCardsCss from "./allProductsCss.css";
const AllProductsComponent = (props) => {
  const [arrOfProducts, setArrOfProducts] = useState([]);

  useEffect(() => {
    console.log("arrOfProducts-- productName--arrOfCards ", arrOfProducts);
    // handleGetAllCardsClick();
  }, [arrOfProducts]);
  useEffect(() => {
    handleGetAllCardsClick();
  }, []);

  const handleGetAllCardsClick = () => {
    axios
      .get("/products")
      .then((data) => {
        setArrOfProducts(data.data);

        console.log("arrOfProducts", arrOfProducts);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  //////////////////////////////
  //this function delete product card from data base and stat - it was moved to dashBord- maybe whan  wanna delete something from all cards the base of it can help
  // const deleteFromGetAllCards = (id) => {

  //   axios
  //     .delete(`/products/removeProduct?id=${id}`)
  //     .then((data) => {
  //       let copyArrOfProducts = cloneDeep(arrOfProducts);
  //       let productIndex = copyArrOfProducts.findIndex(
  //         (item) => item._id === id
  //       );
  //       // let productIndex = copyArrOfProducts.find((item) => item._id === id);

  //       if (productIndex > -1) {
  //         console.log("index is", productIndex);
  //         copyArrOfProducts.splice(productIndex);
  //         setArrOfProducts(copyArrOfProducts);
  //         handleGetAllCardsClick();
  //       }
  //       // if (arrOfProducts.length > 0) {
  //       // }
  //     })
  //     .catch((err) => {
  //       console.log("err deleting from axios", err);
  //     });
  // };

  //////////////////////////////
  // until here  this function delete product card from data base and stat - it was moved to dashBord- maybe whan  wanna delete something from all cards the base of it can help

  return (
    <div className="rows">
      {arrOfProducts.map((arr) => (
        <ProductCardComponent
          setProductName={arr.productName}
          setProductPrice={arr.productPrice}
          setProductId={arr._id}
          // handleDeleteProduct={deleteFromGetAllCards}
          key={arr._id}
        />
      ))}

      {/* <button onClick={handleGetAllCardsClick}> get all card</button> */}
      <button onClick={handleGetAllCardsClick}> get all card</button>
    </div>
  );
};

export default AllProductsComponent;
