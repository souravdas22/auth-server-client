import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Typography, Box, Paper, Button, Grid } from "@mui/material";
import axiosInstance, { product_img } from "../../helper/axiosInstance";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    console.log(product);
    useEffect(() => {
        const fetchProduct = async () => {
            var _a;
            try {
                const response = await axiosInstance.get(`/product/${id}`);
                setProduct((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data);
            }
            catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        fetchProduct();
    }, [id]);
    if (!product)
        return _jsx(Typography, { children: "Loading..." });
    return (_jsx(Container, { maxWidth: "md", children: _jsx(Box, { mt: 4, mb: 2, height: "80vh", sx: { display: "flex", alignItems: "center" }, children: _jsx(Paper, { elevation: 3, children: _jsxs(Grid, { container: true, spacing: 2, padding: 2, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx("img", { src: product_img(product.image), alt: product.name, style: {
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                } }) }), _jsxs(Grid, { item: true, xs: 12, md: 6, position: "relative", children: [_jsxs(Box, { padding: 2, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: product.name }), _jsxs(Typography, { variant: "body1", gutterBottom: true, children: [_jsx("b", { children: "Price: " }), "\u20B9", product.price] }), _jsxs(Typography, { variant: "body1", paragraph: true, children: [_jsx("b", { children: "Sizes:" }), " ", product.size.join(", ")] }), _jsxs(Typography, { variant: "body1", paragraph: true, children: [_jsx("b", { children: "Colors:" }), " ", product.color.join(", ")] }), _jsxs(Typography, { variant: "body1", paragraph: true, children: [_jsx("b", { children: "Brand:" }), " ", product.brand] }), _jsxs(Typography, { variant: "body1", paragraph: true, children: [_jsx("b", { children: "Description:" }), " ", product.description] })] }), _jsx(Box, { mt: 2, position: "absolute", bottom: 0, right: 0, children: _jsxs(Button, { component: Link, to: "/products", variant: "outlined", sx: {
                                            bgcolor: "teal",
                                            color: "white",
                                            transition: "background-color 0.4s ease, color 0.3s ease, border-color 0.3s ease,scale 0.3s ease",
                                            "&:hover": {
                                                bgcolor: "darkgreen",
                                                scale: "1.02",
                                            },
                                        }, children: [_jsx(ArrowBackIosIcon, { sx: { fontSize: "15px" } }), " Back"] }) })] })] }) }) }) }));
};
export default ProductDetails;
