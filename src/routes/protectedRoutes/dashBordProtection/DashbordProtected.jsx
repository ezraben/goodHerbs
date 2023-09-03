import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Dashbordpage from "../../../pages/dashbordPage/Dashbord.page";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";

const ProtectedComponent = () => {
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
      navigate("/dash");
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return <Dashbordpage />;
};

export default ProtectedComponent;
