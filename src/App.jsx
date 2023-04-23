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
import NavBarComponent from "./componenets/NavBarComponent/NavBar.component";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import ErrorPage from "./pages/ErrorPage/Error.page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dash",
      element: <Dashbordpage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
  return (
    <div className="container">
      <ToastContainer />
      <NavBarComponent />
      <RouterProvider router={router}>
        {/* <LoginPage /> */}
        {/* <SingUpPage /> */}
        <AddProductPage />
        {/* <AllProductsComponent /> */}
        {/* <ProductCardComponent /> */}

        {/* <Dashbordpage /> */}
      </RouterProvider>
    </div>
  );
}

export default App;
