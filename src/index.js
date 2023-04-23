import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";

import axios from "axios";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* import bootstrap to react project */
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

import "react-toastify/dist/ReactToastify.css";

import store from "./store/index";

import Root from "./routes/root";
import ErrorPage from "./pages/ErrorPage/Error.page";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//   },
// ]);

axios.defaults.baseURL = "http://localhost:3001/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    //if token saved in localStorage then
    //I want to add the token to the header of the request
    config.headers["x-auth-token"] = token;
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
