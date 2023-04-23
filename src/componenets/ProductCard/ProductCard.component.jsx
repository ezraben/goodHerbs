import productCss from "./productCss.css";
import axios from "axios";

const ProductCardComponent = ({
  setProductName,
  setProductPrice,
  setProductId,
  handleDeleteProduct,
  handleEditProduct,
  onCancelEdit,
}) => {
  const clickOnCard = (id) => {
    console.log("id:", setProductId);
    axios
      .get(`/products/findProductById?id=${setProductId}`)
      .then((data) => {
        console.log("card idddddddd", data.data);
      })
      .catch((err) => {
        console.log("err from axiosssssss", err);
      });
  };

  const onDelete = () => {
    handleDeleteProduct(setProductId);
  };
  const onEdit = (ev) => {
    // ev.stopPropagation();
    handleEditProduct(setProductId);
  };

  return (
    <div onClick={clickOnCard} className="product">
      <div className="mb-3">
        <h1> product name: {setProductName}</h1>
      </div>
      <div className="mb-3">
        <h2> product price: {setProductPrice} </h2>
      </div>
      <button onClick={onDelete} className="btn btn-danger">
        {/* <button onClick={deleteProduct} className="btn btn-danger"> */}
        Delete Product
      </button>
      <button onClick={onEdit} className="btn btn-warning">
        {/* <button onClick={deleteProduct} className="btn btn-danger"> */}
        Edit Product
      </button>
    </div>
  );
};

export default ProductCardComponent;

////////////////////////////////////////////////
//from here delete works and get card ID works delete not on state yet -  - this is before moving delete function to all products page  and changes on that page
// import productCss from "./productCss.css";
// import axios from "axios";

// const ProductCardComponent = ({
//   setProductName,
//   setProductPrice,
//   setProductId,
//   // clickOnCard,
// }) => {
//   const clickOnCard = (id) => {
//     console.log("id:", setProductId);
//     axios
//       .get(`/products/findProductById?id=${setProductId}`)
//       .then((data) => {
//         console.log("card idddddddd", data.data);
//       })
//       .catch((err) => {
//         console.log("err from axiosssssss", err);
//       });
//   };

//   const deleteProduct = (id) => {
//     console.log("id:", setProductId);
//     axios
//       .delete(`/products/removeProduct?id=${setProductId}`)
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((err) => {
//         console.log("err deleting from axios", err);
//       });
//   };
//   return (
//     <div onClick={clickOnCard} className="product">
//       <div className="mb-3">
//         <h1> product name: {setProductName}</h1>
//       </div>
//       <div className="mb-3">
//         <h2> product price: {setProductPrice} </h2>
//       </div>
//       <button onClick={deleteProduct} className="btn btn-danger">
//         Delete Product
//       </button>
//     </div>
//   );
// };

// export default ProductCardComponent;
////////////////////////////////////////////////
//until here delete works and get card ID works delete not on state yet -  - this is before moving delete function to all products page  and changes on that page
