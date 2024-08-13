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
    Component: <Products />,
  },
  {
    path: "/login",
    Component: <Login />,
  },
  {
    path: "/register",
    Component: <Register />,
  },
];

const PrivateRouteNames = [
  {
    path: "/create",
    Component: <ProductForm />,
  },
  {
    path: "/update/:id",
    Component: <UpdateProduct />,
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
