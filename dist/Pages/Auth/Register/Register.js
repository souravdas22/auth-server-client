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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, InputLabel, Input, } from "@mui/material";
import { useMutation } from "react-query";
import { registerUser } from "../../../Api/Queries/registerUser.api";
import { Link, useNavigate } from "react-router-dom";
var Register = function () {
    var _a, _b, _c, _d;
    var navigate = useNavigate();
    var _e = useForm(), register = _e.register, handleSubmit = _e.handleSubmit, errors = _e.formState.errors;
    var mutation = useMutation(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var formData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new FormData();
                    formData.append("name", data.name);
                    formData.append("email", data.email);
                    formData.append("password", data.password);
                    formData.append("mobile", data.mobile);
                    if (data.image && data.image.length > 0) {
                        formData.append("image", data.image[0]);
                    }
                    return [4 /*yield*/, registerUser(formData)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, {
        onSuccess: function () {
            navigate('/login');
        }
    });
    var onSubmit = function (data) {
        mutation.mutate(data);
    };
    return (_jsxs(Box, { sx: {
            maxWidth: 400,
            mx: "auto",
            mt: 6,
            p: 4,
            mb: 6,
            border: "1px solid #ddd",
            borderRadius: 4,
        }, children: [_jsx(Typography, { variant: "h5", component: "h1", gutterBottom: true, textAlign: 'center', children: "Register" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(TextField, __assign({ label: "Name", variant: "outlined", fullWidth: true, margin: "normal" }, register("name", { required: "Name is required" }), { error: !!errors.name, helperText: (_a = errors.name) === null || _a === void 0 ? void 0 : _a.message })), _jsx(TextField, __assign({ label: "Email", variant: "outlined", fullWidth: true, margin: "normal" }, register("email", { required: "Email is required" }), { error: !!errors.email, helperText: (_b = errors.email) === null || _b === void 0 ? void 0 : _b.message })), _jsx(TextField, __assign({ label: "Password", type: "password", variant: "outlined", fullWidth: true, margin: "normal" }, register("password", { required: "Password is required" }), { error: !!errors.password, helperText: (_c = errors.password) === null || _c === void 0 ? void 0 : _c.message })), _jsx(TextField, __assign({ label: "Mobile", variant: "outlined", fullWidth: true, margin: "normal" }, register("mobile", { required: "Mobile number is required" }), { error: !!errors.mobile, helperText: (_d = errors.mobile) === null || _d === void 0 ? void 0 : _d.message })), _jsx(InputLabel, { htmlFor: "image-upload", children: "Upload Image" }), _jsx(Input, __assign({ id: "image-upload", type: "file", inputProps: { accept: "image/*" } }, register("image"))), _jsxs(Typography, { variant: "body2", my: 1, textAlign: "right", children: ["Already have an account?", _jsx(Link, { to: "/login", children: "login" })] }), _jsx(Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, sx: { mt: 2, bgcolor: "teal" }, children: "Register" })] }), mutation.isLoading && _jsx(Typography, { children: "Loading..." }), mutation.isSuccess && _jsx(Typography, { children: "Registration successful!" })] }));
};
export default Register;
