import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { Fragment, useEffect, useState } from "react";

import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import navCss from "./navCss.css";
import { BoxArrowInRight, PersonAdd, PersonDash } from "react-bootstrap-icons";

const NavBarComponent = () => {
  const isLogin = useSelector((store) => store.auth.loggedIn);
  const admin = localStorage.getItem("isAdmin");
  const userEmail = localStorage.getItem("userEmail");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    if (localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else {
      dispatch(authActions.logOut());
    }
  };

  const logOut = (ev) => {
    localStorage.clear();
    dispatch(authActions.logOut());
    navigate("/login");
  };

  return (
    <div className="mb-5">
      <nav
        className={
          isLogin
            ? "navbar navbar-expand-lg navbar-light bg-success"
            : "navbar navbar-expand-lg navbar-light bg-danger"
        }
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-around">
              {!isLogin && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="login">
                      you are not connected
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="login">
                      Login <BoxArrowInRight />
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="SingUpPage">
                      SingUpPage <PersonAdd />
                    </NavLink>
                  </li>
                </Fragment>
              )}
              {isLogin && admin === "false" && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/">
                      {userEmail}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="AllProductsComponent">
                      AllProductsComponent
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      to="/LikedProductPage"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      LikedProductPage
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-warning "
                      to="/DeleteAccountPage"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      DeleteAccountPage
                    </NavLink>
                  </li>
                  <li onClick={logOut} className="nav-item">
                    <NavLink className="nav-link text-danger" to="#">
                      LogOut
                      <PersonDash />
                    </NavLink>
                  </li>
                </Fragment>
              )}

              {isLogin && admin === "true" && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/">
                      {userEmail}
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="AllProductsComponent"
                        >
                          AllProductsComponent
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="LikedProductPage"
                        >
                          LikedProductPage
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="SupeAdminDashBordPage"
                        >
                          SupeAdminDashBordPage
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="AdminDataPage">
                          AdminDataPage
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item text-danger"
                          to="/DeleteAccountPage"
                          tabIndex="-1"
                          aria-disabled="true"
                        >
                          DeleteAccountPage
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="dash">
                      Dashbord
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="addProduct">
                      addProduct
                    </NavLink>
                  </li>

                  <li onClick={logOut} className="nav-item">
                    <NavLink className="nav-link text-danger" to="#">
                      LogOut <PersonDash />
                    </NavLink>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBarComponent;
