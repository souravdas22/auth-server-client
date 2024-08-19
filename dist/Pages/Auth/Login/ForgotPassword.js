import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { forgotPassword } from "../../../Api/Queries/forgotPassword.api";
import { toast } from "react-toastify";
export default function ForgotPassword() {
    var _a;
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const mutation = useMutation(forgotPassword, {
        onSuccess: (data) => {
            toast.success(data === null || data === void 0 ? void 0 : data.message);
            // Uncomment this if you want to navigate after success
            console.log(data);
        },
        onError: (error) => {
            var _a, _b;
            toast.error(((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "An error occurred");
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
        }, children: [_jsx(Typography, { variant: "h5", component: "h1", gutterBottom: true, textAlign: "center", children: "Forgot Password" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(TextField, { label: "Email", variant: "outlined", fullWidth: true, margin: "normal", ...register("email", { required: "Email is required" }), error: !!errors.email, helperText: (_a = errors.email) === null || _a === void 0 ? void 0 : _a.message }), _jsx(LoadingButton, { type: "submit", variant: "contained", color: "primary", fullWidth: true, sx: { mt: 2, bgcolor: "teal" }, loading: mutation.isLoading, loadingIndicator: "Submitting...", children: "Submit" })] })] }));
}
