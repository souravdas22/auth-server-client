import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { newPassword } from "../../../Api/Queries/newPassword.api";
import { useNavigate, useParams } from "react-router-dom";
export default function NewPassword() {
    var _a, _b;
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const mutation = useMutation(newPassword, {
        onSuccess: (data) => {
            toast.success(data === null || data === void 0 ? void 0 : data.message);
            // Uncomment this if you want to navigate after success
            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
                navigate("/login");
            }
        },
        onError: (error) => {
            var _a, _b;
            toast.error(((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "An error occurred");
        },
    });
    const onSubmit = (data) => {
        if (data.newPassword !== data.confirmNewPassword) {
            toast.error("Confirm password does not match");
        }
        else {
            mutation.mutate({ data, id });
        }
    };
    return (_jsxs(Box, { sx: {
            maxWidth: 400,
            mx: "auto",
            mt: 20,
            p: 4,
            mb: 30,
            border: "1px solid #ddd",
            borderRadius: 4,
        }, children: [_jsx(Typography, { variant: "h5", component: "h1", gutterBottom: true, textAlign: "center", children: "Create New Password" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(TextField, { label: "New Password", variant: "outlined", type: "password", fullWidth: true, margin: "normal", ...register("newPassword", { required: "NewPassword is required" }), error: !!errors.newPassword, helperText: (_a = errors.newPassword) === null || _a === void 0 ? void 0 : _a.message }), _jsx(TextField, { label: "Confirm New Password", variant: "outlined", type: "password", fullWidth: true, margin: "normal", ...register("confirmNewPassword", {
                            required: "Confirm New Password is required",
                        }), error: !!errors.confirmNewPassword, helperText: (_b = errors.confirmNewPassword) === null || _b === void 0 ? void 0 : _b.message }), _jsx(LoadingButton, { type: "submit", variant: "contained", color: "primary", fullWidth: true, sx: { mt: 2, bgcolor: "teal" }, loading: mutation.isLoading, loadingIndicator: "Submitting...", children: "Submit" })] })] }));
}
