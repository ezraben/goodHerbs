import AddProductPage from "../../../pages/AddProduct/AddProduct.page";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";

const ProtectingAddProductComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    if (localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/addProduct");
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return <AddProductPage />;
};

export default ProtectingAddProductComponent;
