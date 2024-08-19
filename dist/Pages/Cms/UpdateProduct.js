import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Container, TextField, Button, Checkbox, FormControlLabel, FormGroup, Typography, Box, InputLabel, Input, FormControl, Select, MenuItem, } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";
import { getProductById } from "../../Api/Queries/getProductById.api";
import { updateProduct } from "../../Api/Queries/updateProduct.api";
export default function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useQuery(["product", id], () => getProductById(id || ""));
    const { register, handleSubmit, setValue, watch, control } = useForm({
        defaultValues: {
            name: "",
            price: 0,
            size: [],
            color: [],
            brand: '',
            description: "",
            image: null,
        },
    });
    useEffect(() => {
        if (data) {
            setValue("name", data.name);
            setValue("price", data.price);
            setValue("size", data.size);
            setValue("color", data.color);
            setValue("brand", data.brand);
            setValue("description", data.description);
        }
    }, [data, setValue]);
    const mutation = useMutation(updateProduct, {
        onSuccess: () => {
            toast.success("Product updated successfully");
            navigate("/products");
        },
        onError: () => {
            toast.error("Failed to update product");
        },
    });
    const onSubmit = (formData) => {
        console.log(formData === null || formData === void 0 ? void 0 : formData.image);
        const productData = new FormData();
        productData.append("name", formData.name);
        productData.append("price", formData.price.toString());
        formData.size.forEach((size) => productData.append("size", size));
        formData.color.forEach((color) => productData.append("color", color));
        productData.append("brand", formData.brand);
        productData.append("description", formData.description);
        if (formData.image && formData.image.length > 0) {
            productData.append("image", formData.image[0]);
        }
        mutation.mutate({ formData: productData, id });
    };
    const selectedSizes = watch("size", []);
    const selectedColors = watch("color", []);
    return (_jsx(Container, { maxWidth: "sm", children: _jsxs(Box, { my: 2, boxShadow: 3, borderRadius: 2, py: 2, px: 4, children: [_jsx(Typography, { variant: "h4", align: "center", gutterBottom: true, children: "Edit Product" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(TextField, { label: "Product Name", variant: "outlined", fullWidth: true, margin: "normal", ...register("name", { required: true }), InputProps: {
                                inputProps: {
                                    style: {
                                        padding: "10px 8px",
                                    },
                                },
                            } }), _jsx(TextField, { label: "Product Price", variant: "outlined", type: "number", fullWidth: true, margin: "normal", ...register("price", { required: true }), InputProps: {
                                inputProps: {
                                    style: {
                                        padding: "10px 8px",
                                    },
                                },
                            } }), _jsx(Typography, { variant: "subtitle1", gutterBottom: true, children: "Size:" }), _jsx(FormGroup, { row: true, children: ["s", "m", "l", "xl", "xxl"].map((size) => (_jsx(FormControlLabel, { control: _jsx(Checkbox, { value: size, ...register("size"), checked: selectedSizes.includes(size) }), label: size }, size))) }), _jsx(Typography, { variant: "subtitle1", gutterBottom: true, children: "Color:" }), _jsx(FormGroup, { row: true, children: ["red", "green", "blue"].map((color) => (_jsx(FormControlLabel, { control: _jsx(Checkbox, { value: color, ...register("color"), checked: selectedColors.includes(color) }), label: color }, color))) }), _jsx(Typography, { variant: "body1", my: 1, children: "Brand:" }), _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { id: "brand-label", children: "Brand" }), _jsx(Controller, { name: "brand", control: control, render: ({ field }) => (_jsx(Select, { ...field, labelId: "brand-label", label: "Brand", value: field.value || "", onChange: (e) => field.onChange(e.target.value), children: ["Levis", "Nike", "Mufti", "Adidas"].map((brand) => (_jsx(MenuItem, { value: brand, children: brand }, brand))) })) })] }), _jsx(Controller, { name: "description", control: control, render: ({ field }) => (_jsx(TextField, { ...field, label: "Product Description", variant: "outlined", fullWidth: true, margin: "normal", required: true, multiline: true, rows: 3 })) }), _jsx(InputLabel, { htmlFor: "image-upload", children: "Upload Image" }), _jsx(Input, { id: "image-upload", type: "file", inputProps: { accept: "image/*" }, ...register("image") }), _jsx(Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, sx: { bgcolor: "teal" }, children: "Submit" })] })] }) }));
}
