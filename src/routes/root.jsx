/////////////////////////////
// from here nav

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
// import { authActions } from "../../store/auth";
import { Fragment, useEffect, useState } from "react";

import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const NavBarComponent = () => {
  const isLogin = useSelector((store) => store.auth.loggedIn);
  const admin = localStorage.getItem("isAdmin");
  console.log("admin@walla.co.il", admin);

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
    <div>
      <nav
        className={
          isLogin
            ? "navbar navbar-expand-lg navbar-light bg-success"
            : "navbar navbar-expand-lg navbar-light bg-danger"
        }
      >
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            Navbar
          </NavLink>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-a active" aria-current="page" to="#">
                  Home
                </NavLink>
              </li>

              {!isLogin && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="SingUpPage">
                      SingUpPage
                    </NavLink>
                  </li>
                </Fragment>
              )}
              {isLogin && admin === "false" && (
                <Fragment>
                  <li onClick={logOut} className="nav-item">
                    <NavLink className="nav-link" to="#">
                      LogOut
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="AllProductsComponent"
                    >
                      AllProductsComponent
                    </NavLink>
                  </li>
                </Fragment>
              )}

              {isLogin && admin === "true" && (
                <Fragment>
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
                        <NavLink className="dropdown-item" to="addProduct">
                          addProduct
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="AllProductsComponent"
                        >
                          AllProductsComponent
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="dash">
                          Dashbord
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    </ul>
                  </li>
                  <li onClick={logOut} className="nav-item">
                    <NavLink className="nav-link" to="#">
                      LogOut
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link disabled"
                      to="#"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      Disabled
                    </NavLink>
                  </li>
                </Fragment>
              )}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default NavBarComponent;
// export default Root;

///////////////////////////
//until here nav
//   const Root = () => {
//     // export default function Root() {
//     return (
//       <>
//         <div id="sidebar">
//           <h1>React Router Contacts</h1>
//           <div>
//             <form id="search-form" role="search">
//               <input
//                 id="q"
//                 aria-label="Search contacts"
//                 placeholder="Search"
//                 type="search"
//                 name="q"
//               />
//               <div id="search-spinner" aria-hidden hidden={true} />
//               <div className="sr-only" aria-live="polite"></div>
//             </form>
//             <form method="post">
//               <button type="submit">New</button>
//             </form>
//           </div>
//           <nav>
//             <ul>
//               <li>
//                 <a to={`/dash`}>Your Name</a>
//                 {/* <a to={`/contacts/1`}>Your Name</a> */}
//               </li>
//               <li>
//                 <a to={`/contacts/2`}>Your Friend</a>
//               </li>
//             </ul>
//           </nav>
//         </div>
//         <div id="detail"></div>
//       </>
//     );
//   };

// export default Root;
