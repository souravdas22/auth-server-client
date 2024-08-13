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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Checkbox, FormControlLabel, FormGroup, Container, Typography, Box, InputLabel, Input, } from "@mui/material";
import { useMutation } from "react-query";
import { createProduct } from "../../Api/Queries/createProduct.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
var ProductForm = function () {
    var navigate = useNavigate();
    var _a = useForm({
        defaultValues: {
            name: "",
            price: 0,
            size: [],
            color: [],
            image: null,
        },
    }), control = _a.control, handleSubmit = _a.handleSubmit, register = _a.register;
    var mutation = useMutation(createProduct, {
        onSuccess: function () {
            toast.success("Product created successfully");
            navigate("/");
        },
        onError: function () {
            toast.error("Failed to create product");
        },
    });
    var onSubmit = function (formData) {
        var productData = new FormData();
        productData.append("name", formData.name);
        productData.append("price", formData.price.toString());
        formData.size.forEach(function (size) { return productData.append("size", size); });
        formData.color.forEach(function (color) { return productData.append("color", color); });
        if (formData.image && formData.image.length > 0) {
            productData.append("image", formData.image[0]); // Only append the first file
        }
        mutation.mutate(productData);
    };
    return (_jsx(Container, { maxWidth: "sm", children: _jsxs(Box, { p: 5, boxShadow: 3, borderRadius: 2, margin: "50px 0", children: [_jsx(Typography, { variant: "h4", align: "center", children: "Create Product" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(Controller, { name: "name", control: control, render: function (_a) {
                                var field = _a.field;
                                return (_jsx(TextField, __assign({}, field, { label: "Product Name", variant: "outlined", fullWidth: true, margin: "normal", required: true })));
                            } }), _jsx(Controller, { name: "price", control: control, render: function (_a) {
                                var field = _a.field;
                                return (_jsx(TextField, __assign({}, field, { type: "text", label: "Price", variant: "outlined", fullWidth: true, margin: "normal", required: true })));
                            } }), _jsx(Typography, { variant: "h6", children: "Size:" }), _jsx(FormGroup, { row: true, children: ["s", "m", "l", "xl", "xxl"].map(function (size) { return (_jsx(FormControlLabel, { control: _jsx(Controller, { name: "size", control: control, render: function (_a) {
                                        var field = _a.field;
                                        return (_jsx(Checkbox, __assign({}, field, { value: size, checked: field.value.includes(size), onChange: function (e) {
                                                return field.onChange(e.target.checked
                                                    ? __spreadArray(__spreadArray([], field.value, true), [size], false) : field.value.filter(function (v) { return v !== size; }));
                                            } })));
                                    } }), label: size }, size)); }) }), _jsx(Typography, { variant: "h6", children: "Color:" }), _jsx(FormGroup, { row: true, children: ["red", "green", "blue"].map(function (color) { return (_jsx(FormControlLabel, { control: _jsx(Controller, { name: "color", control: control, render: function (_a) {
                                        var field = _a.field;
                                        return (_jsx(Checkbox, __assign({}, field, { value: color, checked: field.value.includes(color), onChange: function (e) {
                                                return field.onChange(e.target.checked
                                                    ? __spreadArray(__spreadArray([], field.value, true), [color], false) : field.value.filter(function (v) { return v !== color; }));
                                            } })));
                                    } }), label: color }, color)); }) }), _jsx(InputLabel, { htmlFor: "image-upload", children: "Upload Image" }), _jsx(Input, __assign({ id: "image-upload", type: "file", inputProps: { accept: "image/*" } }, register("image"))), _jsx(Box, { mt: 3, children: _jsx(Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, sx: { bgcolor: "teal" }, children: "Submit" }) })] })] }) }));
};
export default ProductForm;
