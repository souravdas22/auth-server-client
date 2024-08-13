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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, TextField, Button, Checkbox, FormControlLabel, FormGroup, Typography, Box, InputLabel, Input, } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";
import { getProductById } from "../../Api/Queries/getProductById.api";
import { updateProduct } from "../../Api/Queries/updateProduct.api";
export default function UpdateProduct() {
    var id = useParams().id;
    var navigate = useNavigate();
    var data = useQuery(["product", id], function () { return getProductById(id || ""); }).data;
    var _a = useForm({
        defaultValues: {
            name: "",
            price: 0,
            size: [],
            color: [],
            image: null,
        },
    }), register = _a.register, handleSubmit = _a.handleSubmit, setValue = _a.setValue, watch = _a.watch;
    useEffect(function () {
        if (data) {
            setValue("name", data.name);
            setValue("price", data.price);
            setValue("size", data.size);
            setValue("color", data.color);
        }
    }, [data, setValue]);
    var mutation = useMutation(updateProduct, {
        onSuccess: function () {
            toast.success("Product updated successfully");
            navigate("/");
        },
        onError: function () {
            toast.error("Failed to update product");
        },
    });
    var onSubmit = function (formData) {
        console.log(formData === null || formData === void 0 ? void 0 : formData.image);
        var productData = new FormData();
        productData.append("name", formData.name);
        productData.append("price", formData.price.toString());
        formData.size.forEach(function (size) { return productData.append("size", size); });
        formData.color.forEach(function (color) { return productData.append("color", color); });
        if (formData.image && formData.image.length > 0) {
            productData.append("image", formData.image[0]);
        }
        mutation.mutate({ formData: productData, id: id });
    };
    var selectedSizes = watch("size", []);
    var selectedColors = watch("color", []);
    return (_jsx(Container, { maxWidth: "sm", children: _jsxs(Box, { margin: "7rem 0", children: [_jsx(Typography, { variant: "h4", align: "center", gutterBottom: true, children: "Edit Product" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(TextField, __assign({ label: "Product Name", variant: "outlined", fullWidth: true, margin: "normal" }, register("name", { required: true }))), _jsx(TextField, __assign({ label: "Product Price", variant: "outlined", type: "number", fullWidth: true, margin: "normal" }, register("price", { required: true }))), _jsx(Typography, { variant: "subtitle1", gutterBottom: true, children: "Size:" }), _jsx(FormGroup, { row: true, children: ["s", "m", "l", "xl", "xxl"].map(function (size) { return (_jsx(FormControlLabel, { control: _jsx(Checkbox, __assign({ value: size }, register("size"), { checked: selectedSizes.includes(size) })), label: size }, size)); }) }), _jsx(Typography, { variant: "subtitle1", gutterBottom: true, children: "Color:" }), _jsx(FormGroup, { row: true, children: ["red", "green", "blue"].map(function (color) { return (_jsx(FormControlLabel, { control: _jsx(Checkbox, __assign({ value: color }, register("color"), { checked: selectedColors.includes(color) })), label: color }, color)); }) }), _jsx(InputLabel, { htmlFor: "image-upload", children: "Upload Image" }), _jsx(Input, __assign({ id: "image-upload", type: "file", inputProps: { accept: "image/*" } }, register("image"))), _jsx(Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, sx: { bgcolor: "teal" }, children: "Submit" })] })] }) }));
}
