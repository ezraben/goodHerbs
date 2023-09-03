import axios from "axios";
import Joi from "joi-browser";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import EditUserValidation from "../../validation/EditUser.validation";

const EditPopUp = (props) => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [email, setEmail] = useState(props.email);
  const [id, setId] = useState(props.id);
  const [isAdmin, setIsAdmin] = useState(props.admin);
  console.log("nnnnnnnnnowwwwwwwwwwwww", isAdmin);

  useEffect(() => {}, []);
  useEffect(() => {
    console.log("isAdmin isAdmin", isAdmin);
  }, [isAdmin]);
  const handleFormClick = (ev) => {
    ev.stopPropagation();
  };

  const hadlefirstNameChange = (ev) => {
    setFirstName(ev.target.value);
  };
  const hadleLastNameChange = (ev) => {
    setLastName(ev.target.value);
  };
  const hadleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const hadleisAdminChange = (ev) => {
    setIsAdmin(ev.target.checked);
    console.log("isAdminmmmmmmmmmmmmmm", isAdmin);
  };

  const handleEditeChangesClick = (ev) => {
    ev.preventDefault();

    const validateValue = Joi.validate(
      {
        firstName,
        lastName,
        email,
        isAdmin,
      },
      EditUserValidation,
      { abortEarly: false }
    );

    const { error } = validateValue;

    axios
      .put(
        `/users/editUser?firstName=${firstName}&lastName=${lastName}&email=${email}&id=${id}&isAdmin=${isAdmin}`
      )
      .then((data) => {
        console.log("data", data);
        if (data.data.status === "Success") {
          toast.success(`user was edit successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          props.refreshAllUsers();

          props.hideEdit();
        }
        if (data.data.codeName === "DuplicateKey") {
          toast.error(email + " already exists", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
  };

  return (
    <div onClick={props.hideEdit} className="center-wrapper">
      <div onClick={handleFormClick} className="buttonContainer center-form">
        <form className="topSpaceFromNav form-group">
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
          </div>

          <div className="d-flex p-2 justify-content-around">
            <button
              onClick={handleEditeChangesClick}
              className="btn btn-warning"
            >
              Edit
            </button>

            <button onClick={props.hideEdit} className="btn btn-danger">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopUp;
