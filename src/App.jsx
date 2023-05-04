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

// import NavBarComponent from "./componenets/NavBarComponent/NavBar.component";
// import ProtectedRoute from "./routes/ProtectedRoute";

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

function App() {
  const isLogin = useSelector((store) => store.auth.loggedIn);
  useEffect(() => {}, [isLogin]);

  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <NavBarComponent />,
    //   errorElement: <ErrorPage />,
    //   children: [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        // {
        //   path: "/",
        //   element: <HomePage />,
        // },
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
        // {
        //   path: "/HomePage",
        //   element: <HomePage />,
        // },
      ],
    },
  ]);

  // const protectedRouts = createBrowserRouter([
  //   {
  //     path: "/dash",
  //     element: <Dashbordpage />,
  //     children: [
  //       {
  //         path: "/dash",
  //         element: <Dashbordpage />,
  //       },
  //     ],
  //   },

  // ]);

  return (
    <div className="container">
      <div className="container">
        <ToastContainer />
        <RouterProvider router={router}>
          <NavBarComponent />
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
            </Routes>
          </Router>
        </RouterProvider>
      </div>
    </div>
  );
}

export default App;
