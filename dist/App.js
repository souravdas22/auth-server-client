import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
function PrivateRoute({ children }) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token === null || token === undefined) {
        toast.warning("Please log in to access this page");
        return _jsx(Navigate, { to: "/login" });
    }
    return _jsx(_Fragment, { children: children });
}
const PublicRouteNames = [
    {
        path: "/",
        Component: _jsx(Home, {}),
    },
    {
        path: "/login",
        Component: _jsx(Login, {}),
    },
    {
        path: "/register",
        Component: _jsx(Register, {}),
    },
    {
        path: "/forgot-password",
        Component: _jsx(ForgotPassword, {}),
    },
    {
        path: "/password-reset/:id",
        Component: _jsx(NewPassword, {}),
    },
    {
        path: "/verified/:email/:token",
        Component: _jsx(ConfirmationPage, {}),
    },
];
const PrivateRouteNames = [
    {
        path: "/products",
        Component: _jsx(Products, {}),
    },
    {
        path: "/product/:id",
        Component: _jsx(ProductDetails, {}),
    },
    {
        path: "/create",
        Component: _jsx(ProductForm, {}),
    },
    {
        path: "/update/:id",
        Component: _jsx(UpdateProduct, {}),
    },
    {
        path: "/update-password",
        Component: _jsx(UpdatePassword, {}),
    },
];
function App() {
    return (_jsx(_Fragment, { children: _jsxs(BrowserRouter, { children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [PublicRouteNames.map((route, index) => (_jsx(Route, { path: route.path, element: route.Component }, index))), PrivateRouteNames.map((route, index) => (_jsx(Route, { path: route.path, element: _jsx(PrivateRoute, { children: route.Component }) }, index)))] }), _jsx(Footer, {})] }) }));
}
export default App;
