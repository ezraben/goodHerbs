import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { authActions } from "../../store/auth";

import deleteccontCss from "./deleteAccountCss.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteAccountPage = () => {
  const isLogin = useSelector((store) => store.auth.loggedIn);
  const userEmail = localStorage.getItem("userEmail");

  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [showDeleteBtn]);

  const hendleShowDeleteBtn = (ev) => {
    setShowDeleteBtn(ev.target.checked);
  };

  const handleDeleteBtnClick = (ev) => {
    console.log("userEmail", userEmail);

    axios
      .delete(`products/deleteProductsByUserForDelete?email=${userEmail}`)

      .then((data) => {
        console.log("data from innnerrr axios", data);
        if (userEmail) {
          axios
            .delete(`/users/removeUserByMail?email=${userEmail}`)

            .then((data) => {
              localStorage.clear();
              dispatch(authActions.logOut());
              navigate("/login");
              if (data.data.status === "Success") {
                toast.success(`🦄  user deleted  successfully!`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
        }
      })
      .catch((err) => {
        console.log("err from axios", err);
      });
  };

  return (
    <div className="container">
      <h1>are you sure you want to delete your account??</h1>
      <h2>
        if you will delete you accont you wont e able to retrive it and all the
        properties will be deleted too
      </h2>
      <div className="mb-3">
        <label className="switch">
          {" "}
          <span className="slider round"></span>
          <input
            type="checkbox"
            onChange={hendleShowDeleteBtn}
            value={showDeleteBtn}
          />
          <span className="slider round"></span>
        </label>
        {showDeleteBtn === false && (
          <span>switch on to delete your account</span>
        )}
        {showDeleteBtn === true && isLogin === true && (
          <Fragment>
            <span>by clicking you will delete your account</span>
            <button onClick={handleDeleteBtnClick} className="btn btn-danger">
              DELETE ACCOUNT
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
};
export default DeleteAccountPage;
