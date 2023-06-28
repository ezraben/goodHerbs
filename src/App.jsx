import { ToastContainer } from "react-toastify";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage/Login.page";

import SingUpPage from "./pages/SingUp/SingUp.page";
import AddProductPage from "./pages/AddProduct/AddProduct.page";
import AllProductsComponent from "./componenets/AllProducts/AllProducts.component";
import ProductCardComponent from "./componenets/ProductCard/ProductCard.component";
import Dashbordpage from "./pages/dashbordPage/Dashbord.page";
import EditComponent from "./componenets/EditComponent/Edit.component";
import HomePage from "./pages/HomePage/Home.page";

import {
  createBrowserRouter,
  Route,
  Router,
  Routes,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Root from "./routes/root";
import ErrorPage from "./pages/ErrorPage/Error.page";
import { Fragment, useEffect } from "react";
import NavBarComponent from "./routes/root";
import ProtectedComponent from "./routes/protectedRoutes/dashBordProtection/DashbordProtected";
import ProtectingAddProductComponent from "./routes/protectedRoutes/addProductProtection/ProtecteingAddProducd.component";
import NavbarWrapper from "./componenets/NavWraper/NavbarWrapper";
import DeleteAccountPage from "./pages/DeleteAccountPage/DeleteAccount.page";
import DeleteUserProtection from "./routes/protectedRoutes/deleteUserProtection/DeleteUserProtection";
import SupeAdminDashBordPage from "./pages/SuperAdminDshbord/SuperAdminDasbord.page";
import LikedProductPage from "./pages/likedProductPage/LikedProduct.page";

function App() {
  const isLogin = useSelector((store) => store.auth.loggedIn);
  useEffect(() => {}, [isLogin]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarWrapper />,
      children: [
        {
          path: "/", // yes, again
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/SingUpPage",
          element: <SingUpPage />,
        },

        {
          path: "/dash",
          element: <ProtectedComponent />,
        },
        {
          path: "/addProduct",
          element: <ProtectingAddProductComponent />,
        },
        {
          path: "/AllProductsComponent",
          element: <AllProductsComponent />,
        },
        {
          path: "/DeleteAccountPage",
          element: <DeleteUserProtection />,
        },
        {
          path: "/SupeAdminDashBordPage",
          element: <SupeAdminDashBordPage />,
        },
        {
          path: "/LikedProductPage",
          element: <LikedProductPage />,
        },
      ],
    },
  ]);

  return (
    <div className="container">
      <div className="container">
        <ToastContainer />
        {/* <NavBarComponent /> */}
        <RouterProvider router={router}>
          <Router>
            <Routes>
              <Route
                path="/dash"
                element={
                  <ProtectedComponent isLogin={isLogin}>
                    <Dashbordpage />
                  </ProtectedComponent>
                }
              />
              <Route
                path="/addProduct"
                element={
                  <ProtectedComponent isLogin={isLogin}>
                    <AddProductPage />
                  </ProtectedComponent>
                }
              />
              <Route
                path="/DeleteAccountPage"
                element={
                  <ProtectedComponent isLogin={isLogin}>
                    <DeleteAccountPage />
                  </ProtectedComponent>
                }
              />
            </Routes>
          </Router>
        </RouterProvider>
      </div>
    </div>
  );
}

export default App;
