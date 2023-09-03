import axios from "axios";
import Joi from "joi-browser";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

import singUpCss from "./singUpCss.css";
import SingUpValidation from "../../validation/SingUp.validation";

const SingUpPage = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {}, [isAdmin]);
  const navigate = useNavigate();

  const hadlefirstNameChange = (ev) => {
    setFirstName(ev.target.value);
  };
  const hadleLastNameChange = (ev) => {
    setLastName(ev.target.value);
  };
  const hadleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };

  const hadlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };
  const hadleConfirmPasswordChange = (ev) => {
    setConfirmPassword(ev.target.value);
  };
  const hadleisAdminChange = (ev) => {
    setIsAdmin(ev.target.checked);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validateValue = Joi.validate(
      {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        isAdmin,
      },
      SingUpValidation,
      { abortEarly: false }
    );

    const { error } = validateValue;

    //////////

    if (validateValue) {
      axios
        .post("/auth/signUp", { firstName, lastName, email, password, isAdmin })
        .then((data) => {
          console.log("data", data);

          if (data.data.status === "Success") {
            console.log("isAdmin singup", isAdmin);
            dispatch(authActions.isAdmin({ isAdmin }));
            toast.success(
              `🦄 welcome ${firstName} you  registered successfully!`,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            navigate("/login");
          }

          if (error) {
            const errorArr = error.details;

            for (let i = 0; i <= errorArr.length; i++) {
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

            throw error;
          }
          if (data.data.status === "Failed") {
            toast.error(data.data.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            throw error;
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
        <h1 className="text-center mt-5">singUp</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputFirstName" className="form-label">
            First Name
          </label>
          <input
            type="firstName"
            className="form-control"
            id="exampleInputFirstName"
            aria-describedby="firstNameHelp"
            onChange={hadlefirstNameChange}
            value={firstName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputlastName1" className="form-label">
            Last Name
          </label>
          <input
            type="lastName"
            className="form-control"
            id="exampleInputlastName1"
            aria-describedby="lastNameHelp"
            onChange={hadleLastNameChange}
            value={lastName}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="exampleInputConfrirmPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="ConfrirmPassword"
            className="form-control"
            id="exampleInputConfrirmPassword1"
            placeholder="ConfrirmPassword"
            onChange={hadleConfirmPasswordChange}
            value={confirmPassword}
          />
        </div>
        {password !== confirmPassword && (
          <div className="alert alert-warning">
            password and confirm password must match
          </div>
        )}
        <div className="mb-3">
          <label className="switch">
            {" "}
            <span className="slider round"></span>
            <input
              type="checkbox"
              onChange={hadleisAdminChange}
              value={isAdmin}
            />
            <span className="slider round"></span>
          </label>
          {isAdmin === false && <span>switch on for admin account</span>}
          {isAdmin === true && <span>Admin account is on</span>}
        </div>
        {password !== confirmPassword && (
          <div className="text-center">
            <button className="btn btn-primary text-center m-5 disabled">
              click
            </button>
          </div>
        )}
        {password === confirmPassword && (
          <div className="text-center">
            <button className="btn btn-primary text-center m-5">click</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SingUpPage;
