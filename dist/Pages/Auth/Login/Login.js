var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useMutation } from "react-query";
import { loginUser } from "../../../Api/Queries/loginUser.api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { profile_pic } from "../../../helper/axiosInstance";
var Login = function () {
    var _a, _b;
    var navigate = useNavigate();
    var _c = useForm(), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.formState.errors;
    var mutation = useMutation(loginUser, {
        onSuccess: function (data) {
            var _a, _b;
            toast.success(data === null || data === void 0 ? void 0 : data.message);
            if (data === undefined) {
                toast.error("login unsuccessfull");
            }
            localStorage.setItem("token", data === null || data === void 0 ? void 0 : data.token);
            localStorage.setItem("profile", profile_pic((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.image));
            localStorage.setItem("username", (_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.name);
            if (data !== undefined) {
                navigate("/");
            }
        },
    });
    var onSubmit = function (data) {
        mutation.mutate(data);
    };
    return (_jsxs(Box, { sx: {
            maxWidth: 400,
            mx: "auto",
            mt: 20,
            p: 4,
            mb: 30,
            border: "1px solid #ddd",
            borderRadius: 4,
        }, children: [_jsx(Typography, { variant: "h5", component: "h1", gutterBottom: true, textAlign: "center", children: "Login" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(TextField, __assign({ label: "Email", variant: "outlined", fullWidth: true, margin: "normal" }, register("email", { required: "Email is required" }), { error: !!errors.email, helperText: (_a = errors.email) === null || _a === void 0 ? void 0 : _a.message })), _jsx(TextField, __assign({ label: "Password", type: "password", variant: "outlined", fullWidth: true, margin: "normal" }, register("password", { required: "Password is required" }), { error: !!errors.password, helperText: (_b = errors.password) === null || _b === void 0 ? void 0 : _b.message })), _jsxs(Typography, { variant: "body2", my: 1, textAlign: "right", children: ["Don't have an account? create one", " ", _jsx(Link, { to: "/register", children: "register" })] }), _jsx(Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, sx: { mt: 2, bgcolor: "teal" }, children: "Login" })] }), mutation.isLoading && _jsx(Typography, { children: "Loading..." })] }));
};
export default Login;
