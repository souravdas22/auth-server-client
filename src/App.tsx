import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./Pages/Layout/Footer";
import Navbar from "./Pages/Layout/Header";
import Login from "./Pages/Auth/Login/Login";
import Products from "./Pages/Cms/Products";
import Register from "./Pages/Auth/Register/Register";
import ProductForm from "./Pages/Cms/CreateProduct";
import UpdateProduct from "./Pages/Cms/UpdateProduct";
import { toast } from "react-toastify";
import Home from "./Pages/Cms/Home";
import ForgotPassword from "./Pages/Auth/Login/ForgotPassword";
import NewPassword from "./Pages/Auth/Login/NewPassword";
import ProductDetails from "./Pages/Cms/ProductDetails";
import ConfirmationPage from "./Pages/Cms/ConfirmationPage";
import UpdatePassword from "./Pages/Auth/Login/UpdatePassword";

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (token === null || token === undefined) {
    toast.warning("Please log in to access this page");
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

const PublicRouteNames = [
  {
    path: "/",
    Component: <Home />,
  },
  {
    path: "/login",
    Component: <Login />,
  },
  {
    path: "/register",
    Component: <Register />,
  },
  {
    path: "/forgot-password",
    Component: <ForgotPassword />,
  },
  {
    path: "/verified/:email/:token",
    Component: <ConfirmationPage />,
  },

  {
    path: "/password-reset/:email/:token",
    Component: <NewPassword />,
  },
];

const PrivateRouteNames = [
  {
    path: "/products",
    Component: <Products />,
  },
  {
    path: "/product/:id",
    Component: <ProductDetails />,
  },
  {
    path: "/create",
    Component: <ProductForm />,
  },
  {
    path: "/update/:id",
    Component: <UpdateProduct />,
  },
  {
    path: "/update-password",
    Component: <UpdatePassword />,
  },
 
];

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {PublicRouteNames.map((route, index) => (
            <Route path={route.path} element={route.Component} key={index} />
          ))}
          {PrivateRouteNames.map((route, index) => (
            <Route
              path={route.path}
              element={<PrivateRoute>{route.Component}</PrivateRoute>}
              key={index}
            />
          ))}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
