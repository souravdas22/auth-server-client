import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { getProducts } from "../../Api/Queries/products.api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Typography, Box, } from "@mui/material";
import { Link } from "react-router-dom";
import { deletedProduct } from "../../Api/Queries/deleteProduct.api";
export default function Products() {
    var _a = useState([]), products = _a[0], setProducts = _a[1];
    var _b = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    }), data = _b.data, refetch = _b.refetch;
    // delete 
    var mutation = useMutation(deletedProduct, {
        onSuccess: function (data) {
            toast.error("product is now deleted");
            refetch();
        },
    });
    useEffect(function () {
        if (data) {
            setProducts(data === null || data === void 0 ? void 0 : data.data);
        }
    }, [data]);
    return (_jsx(Container, { children: _jsxs(Box, { mt: 4, height: '600px', children: [_jsx(Typography, { variant: "h4", align: "center", gutterBottom: true, children: "Product Table" }), _jsx(Box, { display: "flex", justifyContent: "space-between", mb: 3, children: _jsx(Button, { component: Link, to: "/create", variant: "contained", color: "warning", sx: { bgcolor: "purple" }, children: "Add Product" }) }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { size: "small", "aria-label": "product table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { align: "center", children: "Sl.No" }), _jsx(TableCell, { align: "center", children: "Name" }), _jsx(TableCell, { align: "center", children: "Price" }), _jsx(TableCell, { align: "center", children: "Size" }), _jsx(TableCell, { align: "center", children: "Color" }), _jsx(TableCell, { align: "center", children: "Image" }), _jsx(TableCell, { align: "center", children: "Actions" })] }) }), _jsx(TableBody, { children: products.map(function (product, index) { return (_jsxs(TableRow, { children: [_jsx(TableCell, { align: "center", children: index + 1 }), _jsx(TableCell, { align: "center", children: product.name }), _jsxs(TableCell, { align: "center", children: ["\u20B9 ", product.price] }), _jsx(TableCell, { align: "center", children: product.size.join(', ') }), _jsx(TableCell, { align: "center", children: product.color.join(', ') }), _jsx(TableCell, { align: "center", children: _jsx("img", { src: "http://localhost:7000/".concat(product.image), alt: "img", style: { height: "50px", width: "50px", objectFit: "cover", objectPosition: "center" } }) }), _jsxs(TableCell, { align: "center", children: [_jsx(Button, { component: Link, to: "/update/".concat(product._id), variant: "contained", sx: {
                                                        textDecoration: "none",
                                                        color: "white",
                                                        marginRight: 1,
                                                        backgroundColor: "teal"
                                                    }, children: "Edit" }), _jsx(Button, { onClick: function () { mutation.mutateAsync(product._id); }, variant: "contained", color: "error", sx: { textDecoration: "none", color: "white" }, children: "Delete" })] })] }, product._id)); }) })] }) })] }) }));
}
