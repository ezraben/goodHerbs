import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";
import DeleteAccountPage from "../../../pages/DeleteAccountPage/DeleteAccount.page";

const DeleteUserProtection = () => {
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
      navigate("/DeleteAccountPage");
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return <DeleteAccountPage />;
};

export default DeleteUserProtection;
