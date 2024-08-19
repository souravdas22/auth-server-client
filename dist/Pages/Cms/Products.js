import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { getProducts } from "../../Api/Queries/products.api";
import { deletedProduct } from "../../Api/Queries/deleteProduct.api";
import { Paper, Button, Container, Typography, Box, FormControl, FormGroup, FormControlLabel, Checkbox, TextField, Grid, Slider, } from "@mui/material";
import { Link } from "react-router-dom";
import { product_img } from "../../helper/axiosInstance";
import { fetchProductbysize } from "../../Api/Queries/filterBySize.api";
import { fetchProductbycolor } from "../../Api/Queries/filterByColor.api";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { fetchProductbybrand } from "../../Api/Queries/filterByBrands.api";
const sizes = ["s", "m", "xl", "xxl"];
const colors = ["white", "purple", "blue", "black"];
export default function Products() {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([500, 2500]);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(4);
    console.log(limit);
    const { data, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        onSuccess: (data) => {
            setProducts(data.data);
            setOriginalProducts(data.data);
        },
    });
    useEffect(() => {
        if (selectedSizes.length > 0) {
            fetchProductbysize(selectedSizes).then((response) => {
                setProducts(response);
            });
        }
        else if (data) {
            setProducts(data === null || data === void 0 ? void 0 : data.data);
        }
    }, [selectedSizes, data]);
    useEffect(() => {
        if (selectedColors.length > 0) {
            fetchProductbycolor(selectedColors).then((response) => {
                setProducts(response);
            });
        }
        else if (data) {
            setProducts(data === null || data === void 0 ? void 0 : data.data);
        }
    }, [selectedColors, data]);
    useEffect(() => {
        if (selectedBrands.length > 0) {
            fetchProductbybrand(selectedBrands).then((response) => {
                setProducts(response);
            });
        }
        else if (data) {
            setProducts(data === null || data === void 0 ? void 0 : data.data);
        }
    }, [selectedBrands, data]);
    const mutation = useMutation(deletedProduct, {
        onSuccess: () => {
            toast.error("Product has been deleted");
            refetch();
        },
    });
    useEffect(() => {
        const handleSearch = (searchTerm) => {
            if (searchTerm === "") {
                setProducts(originalProducts);
            }
            else {
                const searchedProducts = originalProducts.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
                setProducts(searchedProducts);
            }
        };
        handleSearch(searchTerm);
    }, [searchTerm, originalProducts]);
    useEffect(() => {
        if (data) {
            const filteredByPrice = data.data.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);
            setProducts(filteredByPrice);
        }
    }, [priceRange, data]);
    const handleSizeChange = (size) => {
        setSelectedSizes((prevSizes) => prevSizes.includes(size)
            ? prevSizes.filter((s) => s !== size)
            : [...prevSizes, size]);
    };
    const handleColorChange = (color) => {
        setSelectedColors((prevColors) => prevColors.includes(color)
            ? prevColors.filter((c) => c !== color)
            : [...prevColors, color]);
    };
    const handleBrandChange = (brand) => {
        setSelectedBrands((prevBrands) => prevBrands.includes(brand)
            ? prevBrands.filter((c) => c !== brand)
            : [...prevBrands, brand]);
    };
    const handlePriceRangeChange = (newValue) => {
        if (Array.isArray(newValue)) {
            setPriceRange(newValue);
        }
    };
    return (_jsx(Container, { maxWidth: "xl", children: _jsxs(Box, { mt: 4, mb: 2, display: "flex", height: "auto", gap: 2, alignItems: "start", children: [_jsxs(Box, { sx: {
                        width: 200,
                        p: 1,
                        mt: 4,
                        borderRight: "1px solid #ddd",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }, children: [_jsx(Typography, { variant: "body1", gutterBottom: true, fontWeight: "bold", sx: { borderBottom: "2px solid #ddd" }, children: "Filter by Size" }), _jsx(FormControl, { component: "fieldset", children: _jsx(FormGroup, { children: sizes.map((size) => (_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: selectedSizes.includes(size), onChange: () => handleSizeChange(size) }), label: size }, size))) }) }), _jsx(Typography, { variant: "body1", gutterBottom: true, mt: 1, fontWeight: "bold", sx: { borderBottom: "2px solid #ddd" }, children: "Filter by Color" }), _jsx(FormControl, { component: "fieldset", children: _jsx(FormGroup, { children: colors.map((color) => (_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: selectedColors.includes(color), onChange: () => handleColorChange(color) }), label: color }, color))) }) }), _jsx(Typography, { variant: "body1", gutterBottom: true, mt: 1, fontWeight: "bold", sx: { borderBottom: "2px solid #ddd" }, children: "Filter by Price" }), _jsx(Slider, { value: priceRange, onChange: (e, newValue) => handlePriceRangeChange(newValue), valueLabelDisplay: "auto", min: 500, max: 2500, step: 100, sx: { width: "50%", mt: 2, color: "teal" } }), _jsxs(Typography, { variant: "body2", sx: { mt: 1 }, children: ["\u20B9", priceRange[0], " - \u20B9", priceRange[1]] }), _jsx(Typography, { variant: "body1", gutterBottom: true, mt: 1, fontWeight: "bold", sx: { borderBottom: "2px solid #ddd" }, children: "Filter by Brand" }), _jsx(FormControl, { component: "fieldset", children: _jsx(FormGroup, { children: ["Levis", "Nike", "Mufti", "Adidas"].map((brand) => (_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: selectedBrands.includes(brand), onChange: () => handleBrandChange(brand) }), label: brand }, brand))) }) })] }), _jsxs(Container, { maxWidth: "lg", children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", children: [" ", _jsx(Button, { component: Link, to: "/create", variant: "contained", color: "warning", sx: { bgcolor: "purple", m: 2 }, children: "Add Product" }), _jsx(Box, { display: "flex", alignItems: "center", gap: 1, children: _jsx(TextField, { variant: "outlined", placeholder: "Search products here...", sx: { mb: 2 }, value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), InputProps: {
                                            inputProps: {
                                                style: {
                                                    padding: "5px 8px",
                                                    width: "230px",
                                                },
                                            },
                                        } }) })] }), _jsxs(Grid, { container: true, spacing: 3, children: [products &&
                                    products.slice(0, limit).map((product, index) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsxs(Paper, { elevation: 3, children: [_jsx(Box, { sx: {
                                                        overflow: "hidden",
                                                        borderRadius: 1,
                                                    }, children: _jsx("img", { src: product_img(product.image), alt: product.name, style: {
                                                            width: "100%",
                                                            height: "300px",
                                                            objectFit: "cover",
                                                            objectPosition: "center",
                                                        } }) }), _jsxs(Box, { sx: { px: 2, pt: 1, pb: 1 }, children: [_jsx(Typography, { variant: "body1", component: "div", fontWeight: "bold", children: product.name }), _jsxs(Typography, { variant: "body1", component: "div", children: [_jsx("b", { children: "Sizes: " }), product.size.join(", ")] }), _jsxs(Typography, { variant: "body1", component: "div", children: [_jsx("b", { children: "Colors: " }), product.color.join(", ")] }), _jsxs(Typography, { variant: "body1", component: "div", children: [_jsx("b", { children: "Brand" }), ": ", product.brand] }), _jsxs(Box, { sx: {
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                marginTop: 1,
                                                            }, children: [_jsx(Button, { component: Link, to: `/update/${product._id}`, variant: "contained", sx: {
                                                                        textDecoration: "none",
                                                                        color: "white",
                                                                        marginRight: 1,
                                                                        backgroundColor: "teal",
                                                                    }, children: "Edit" }), localStorage.getItem("token") &&
                                                                    localStorage.getItem("token") !== undefined && (_jsx(Button, { onClick: () => {
                                                                        mutation.mutateAsync(product._id);
                                                                    }, variant: "contained", color: "error", sx: { textDecoration: "none", color: "white" }, children: "Delete" }))] })] }), _jsxs(Box, { sx: {
                                                        bgcolor: "gray",
                                                        p: 1,
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }, children: [_jsx(Link, { to: `/product/${product._id}`, style: {
                                                                color: "white",
                                                                textAlign: "right",
                                                                textDecoration: "none",
                                                            }, children: "See Details" }), _jsx(ArrowForwardIcon, { sx: { color: "white", cursor: "pointer" } })] })] }) }, index))), products.length === 0 && (_jsx(Typography, { variant: "body1", mt: 3, children: "No products available" }))] }), _jsxs(Box, { maxWidth: "xl", display: "flex", justifyContent: "center", mt: 4, mb: 4, gap: 2, children: [_jsx(Button, { variant: "contained", color: "inherit", onClick: () => {
                                        if (limit > products.length) {
                                            setLimit(products.length);
                                        }
                                        else {
                                            setLimit(limit + 4);
                                        }
                                    }, children: "Show More" }), _jsx(Button, { variant: "outlined", color: "inherit", onClick: () => {
                                        if (limit < 1) {
                                            setLimit(4);
                                        }
                                        if (limit > 4) {
                                            setLimit(limit - 4);
                                        }
                                    }, children: "Show Less" })] })] })] }) }));
}
