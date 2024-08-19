import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { useMutation } from "react-query";
import { loginUser } from "../../../Api/Queries/loginUser.api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { profile_pic } from "../../../helper/axiosInstance";
import LoadingButton from "@mui/lab/LoadingButton";
const Login = () => {
    var _a, _b;
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const mutation = useMutation(loginUser, {
        onSuccess: (data) => {
            var _a, _b;
            toast.success(data === null || data === void 0 ? void 0 : data.message);
            localStorage.setItem("token", data === null || data === void 0 ? void 0 : data.token);
            localStorage.setItem("profile", profile_pic((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.image));
            localStorage.setItem("username", (_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.name);
            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
                navigate('/');
            }
        },
    });
    const onSubmit = (data) => {
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
        }, children: [_jsx(Typography, { variant: "h5", component: "h1", gutterBottom: true, textAlign: "center", children: "Login" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(TextField, { label: "Email", variant: "outlined", fullWidth: true, margin: "normal", ...register("email", { required: "Email is required" }), error: !!errors.email, helperText: (_a = errors.email) === null || _a === void 0 ? void 0 : _a.message }), _jsx(TextField, { label: "Password", type: "password", variant: "outlined", fullWidth: true, margin: "normal", ...register("password", { required: "Password is required" }), error: !!errors.password, helperText: (_b = errors.password) === null || _b === void 0 ? void 0 : _b.message }), _jsxs(Typography, { variant: "body2", my: 1, textAlign: "right", children: ["Don't have an account? create one", " ", _jsx(Link, { to: "/register", children: "register" })] }), _jsxs(Typography, { variant: "body2", textAlign: "right", children: [" ", _jsx(Link, { to: "/forgot-password", children: "forgot password" })] }), mutation.isLoading ? (_jsx(LoadingButton, { loading: true, variant: "contained", color: "primary", fullWidth: true, sx: { mt: 2, bgcolor: "teal", py: 2 }, loadingIndicator: _jsx(CircularProgress, { color: "inherit", size: 24 }) })) : (_jsx(Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, sx: { mt: 2, bgcolor: "teal" }, children: "Login" }))] })] }));
};
export default Login;
