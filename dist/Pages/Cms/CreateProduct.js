import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Checkbox, FormControlLabel, FormGroup, Container, Typography, Box, InputLabel, Input, FormControl, Select, MenuItem, } from "@mui/material";
import { useMutation } from "react-query";
import { createProduct } from "../../Api/Queries/createProduct.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ProductForm = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            name: "",
            price: 0,
            size: [],
            color: [],
            brand: '',
            description: '',
            image: null,
        },
    });
    const mutation = useMutation(createProduct, {
        onSuccess: () => {
            toast.success("Product created successfully");
            navigate("/products");
        },
        onError: () => {
            toast.error("Failed to create product");
        },
    });
    const onSubmit = (formData) => {
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
        mutation.mutate(productData);
    };
    return (_jsx(Container, { maxWidth: "sm", children: _jsxs(Box, { px: 4, py: 2, boxShadow: 3, borderRadius: 2, margin: "20px 0", children: [_jsx(Typography, { variant: "h4", align: "center", children: "Create Product" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(Controller, { name: "name", control: control, render: ({ field }) => (_jsx(TextField, { ...field, label: "Product Name", variant: "outlined", fullWidth: true, margin: "normal", required: true, InputProps: {
                                    inputProps: {
                                        style: {
                                            padding: "10px 8px",
                                        },
                                    },
                                } })) }), _jsx(Controller, { name: "price", control: control, render: ({ field }) => (_jsx(TextField, { ...field, type: "text", label: "Price", variant: "outlined", fullWidth: true, margin: "normal", required: true, InputProps: {
                                    inputProps: {
                                        style: {
                                            padding: "10px 8px",
                                        },
                                    },
                                } })) }), _jsx(Typography, { variant: "body1", children: "Size:" }), _jsx(FormGroup, { row: true, children: ["s", "m", "l", "xl", "xxl"].map((size) => (_jsx(FormControlLabel, { control: _jsx(Controller, { name: "size", control: control, render: ({ field }) => (_jsx(Checkbox, { ...field, value: size, checked: field.value.includes(size), onChange: (e) => field.onChange(e.target.checked
                                            ? [...field.value, size]
                                            : field.value.filter((v) => v !== size)) })) }), label: size }, size))) }), _jsx(Typography, { variant: "body1", children: "Color:" }), _jsx(FormGroup, { row: true, children: ["white", "purple", "blue", "black"].map((color) => (_jsx(FormControlLabel, { control: _jsx(Controller, { name: "color", control: control, render: ({ field }) => (_jsx(Checkbox, { ...field, value: color, checked: field.value.includes(color), onChange: (e) => field.onChange(e.target.checked
                                            ? [...field.value, color]
                                            : field.value.filter((v) => v !== color)) })) }), label: color }, color))) }), _jsx(Typography, { variant: "body1", children: "Brand:" }), _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { id: "brand-label", children: "Brand" }), _jsx(Controller, { name: "brand", control: control, render: ({ field }) => (_jsx(Select, { ...field, labelId: "brand-label", label: "Brand", value: field.value || "", onChange: (e) => field.onChange(e.target.value), children: ["Levis", "Nike", "Mufti", "Adidas"].map((brand) => (_jsx(MenuItem, { value: brand, children: brand }, brand))) })) })] }), _jsx(Controller, { name: "description", control: control, render: ({ field }) => (_jsx(TextField, { ...field, label: "Product Description", variant: "outlined", fullWidth: true, margin: "normal", required: true, multiline: true, rows: 3 })) }), _jsx(InputLabel, { htmlFor: "image-upload", children: "Upload Image" }), _jsx(Input, { id: "image-upload", type: "file", inputProps: { accept: "image/*" }, ...register("image") }), _jsx(Box, { mt: 3, children: _jsx(Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, sx: { bgcolor: "teal" }, children: "Submit" }) })] })] }) }));
};
export default ProductForm;
