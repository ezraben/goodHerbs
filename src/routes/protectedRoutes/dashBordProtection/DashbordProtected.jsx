// import { Fragment } from "react";
// import { useSelector } from "react-redux";
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
    // else {
    //   dispatch(authActions.logOut());
    // }
  };
  // const isLogin = useSelector((store) => store.auth.loggedIn);
  useEffect(() => {
    // console.log("islogin from protected", isLogin);
    if (localStorage.getItem("token")) {
      navigate("/dash");
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  //   }, [isLogin]);

  return <Dashbordpage />;
  //   return <div isLogin={isLogin}></div>;
};

export default ProtectedComponent;
