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
function PrivateRoute(_a) {
    var children = _a.children;
    var token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token === null || token === undefined) {
        toast.warning("Please log in to access this page");
        return _jsx(Navigate, { to: "/login" });
    }
    return _jsx(_Fragment, { children: children });
}
var PublicRouteNames = [
    {
        path: "/",
        Component: _jsx(Products, {}),
    },
    {
        path: "/login",
        Component: _jsx(Login, {}),
    },
    {
        path: "/register",
        Component: _jsx(Register, {}),
    },
];
var PrivateRouteNames = [
    {
        path: "/create",
        Component: _jsx(ProductForm, {}),
    },
    {
        path: "/update/:id",
        Component: _jsx(UpdateProduct, {}),
    },
];
function App() {
    return (_jsx(_Fragment, { children: _jsxs(BrowserRouter, { children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [PublicRouteNames.map(function (route, index) { return (_jsx(Route, { path: route.path, element: route.Component }, index)); }), PrivateRouteNames.map(function (route, index) { return (_jsx(Route, { path: route.path, element: _jsx(PrivateRoute, { children: route.Component }) }, index)); })] }), _jsx(Footer, {})] }) }));
}
export default App;
