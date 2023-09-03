import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import { useDispatch, useSelector } from "react-redux";
import LoginValidation from "../../validation/Login.validation";
import auth, { authActions } from "../../store/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Dashbordpage from "../dashbordPage/Dashbord.page";
import { BoxArrowInRight } from "react-bootstrap-icons";

const LoginPage = () => {
  const isLogin = useSelector((store) => store.auth.loggedIn);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hadleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const hadlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validateValue = Joi.validate({ email, password }, LoginValidation, {
      abortEarly: false,
    });
    const { error } = validateValue;
    if (error) {
      for (let i = 0; i < error.details.length; i++) {
        console.log(error.details[i].message);
        toast.error(error.details[i].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    if (email && password && !error) {
      axios

        .post("/auth/login", { email, password })
        .then(({ data }) => {
          if (data) {
            console.log("data from login", data);
            if (data.status === "Failed") {
              console.log("data stataus", data.status);
              toast.error(data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              throw new Error();
            }
            if (data.details) {
              toast.error(data.details[0].message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              throw new Error();
            }

            if (data.status === "Success") {
              localStorage.setItem("token", data.msg);
              localStorage.setItem("isAdmin", data.admin);
              localStorage.setItem("userEmail", email);

              dispatch(authActions.login());

              toast.success(`🦄 welcome ${email} `, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              dispatch(authActions.userEmail(email));
              dispatch(authActions.isAdmin(data.admin));

              if (data.admin === true) {
                navigate("/addProduct");
              }
              if (data.admin === false) {
                navigate("/AllProductsComponent");
              }
            }
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  return (
    <div className="container d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="topSpaceFromNav form-group">
        <h1 className="text-center mt-5">Please Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="email@gmail.com"
            onChange={hadleEmailChange}
            value={email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="password"
            onChange={hadlePasswordChange}
            value={password}
          />
        </div>

        <div className="text-center">
          <button className="btn btn-primary text-center m-5">
            Login <BoxArrowInRight />{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
