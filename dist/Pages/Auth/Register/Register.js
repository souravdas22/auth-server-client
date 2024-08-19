import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, InputLabel, Input, CircularProgress, } from "@mui/material";
import { useMutation } from "react-query";
import { registerUser } from "../../../Api/Queries/registerUser.api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
const Register = () => {
    var _a, _b, _c, _d, _e;
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const mutation = useMutation(registerUser, {
        onSuccess: (data) => {
            if (data.status === 200) {
                toast.success(data.message);
            }
        }
    });
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("mobile", data.mobile);
        if (data.image && data.image.length > 0) {
            formData.append("image", data.image[0]);
        }
        if (data.password !== data.confirmPassword) {
            toast.error("Confirm password does not match");
        }
        else {
            mutation.mutate(formData);
        }
    };
    return (_jsxs(Box, { sx: {
            maxWidth: 400,
            mx: "auto",
            mt: 6,
            p: 4,
            mb: 6,
            border: "1px solid #ddd",
            borderRadius: 4,
        }, children: [_jsx(Typography, { variant: "h5", component: "h1", gutterBottom: true, textAlign: "center", children: "Register" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(TextField, { label: "Name", variant: "outlined", fullWidth: true, margin: "normal", ...register("name", { required: "Name is required" }), error: !!errors.name, helperText: (_a = errors.name) === null || _a === void 0 ? void 0 : _a.message, InputProps: {
                            inputProps: {
                                style: {
                                    padding: "12px 8px",
                                },
                            },
                        } }), _jsx(TextField, { label: "Email", variant: "outlined", fullWidth: true, margin: "normal", ...register("email", { required: "Email is required" }), error: !!errors.email, helperText: (_b = errors.email) === null || _b === void 0 ? void 0 : _b.message, InputProps: {
                            inputProps: {
                                style: {
                                    padding: "12px 8px",
                                },
                            },
                        } }), _jsx(TextField, { label: "Password", type: "password", variant: "outlined", fullWidth: true, margin: "normal", ...register("password", { required: "Password is required" }), error: !!errors.password, helperText: (_c = errors.password) === null || _c === void 0 ? void 0 : _c.message, InputProps: {
                            inputProps: {
                                style: {
                                    padding: "12px 8px",
                                },
                            },
                        } }), _jsx(TextField, { label: "Confirm Password", type: "password", variant: "outlined", fullWidth: true, margin: "normal", ...register("confirmPassword", {
                            required: "Confirm Password is required",
                        }), error: !!errors.confirmPassword, helperText: (_d = errors.confirmPassword) === null || _d === void 0 ? void 0 : _d.message, InputProps: {
                            inputProps: {
                                style: {
                                    padding: "12px 8px",
                                },
                            },
                        } }), _jsx(TextField, { label: "Mobile", variant: "outlined", fullWidth: true, margin: "normal", ...register("mobile", { required: "Mobile number is required" }), error: !!errors.mobile, helperText: (_e = errors.mobile) === null || _e === void 0 ? void 0 : _e.message, InputProps: {
                            inputProps: {
                                style: {
                                    padding: "12px 8px",
                                },
                            },
                        } }), _jsx(InputLabel, { htmlFor: "image-upload", children: "Upload Image" }), _jsx(Input, { id: "image-upload", type: "file", inputProps: { accept: "image/*" }, ...register("image") }), _jsxs(Typography, { variant: "body2", my: 1, textAlign: "right", children: ["Already have an account?", _jsx(Link, { to: "/login", children: "login" })] }), mutation.isLoading ? (_jsx(LoadingButton, { loading: true, variant: "contained", color: "primary", fullWidth: true, sx: { mt: 2, bgcolor: "teal", py: 2 }, loadingIndicator: _jsx(CircularProgress, { color: "inherit", size: 24 }) })) : (_jsx(Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, sx: { mt: 2, bgcolor: "teal" }, children: "Register" }))] })] }));
};
export default Register;
