import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { getProducts } from "../../Api/Queries/products.api";
import { deletedProduct } from "../../Api/Queries/deleteProduct.api";
import {
  Paper,
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Grid,
  Slider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { product_img } from "../../helper/axiosInstance";
import { fetchProductbysize } from "../../Api/Queries/filterBySize.api";
import { fetchProductbycolor } from "../../Api/Queries/filterByColor.api";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { fetchProductbybrand } from "../../Api/Queries/filterByBrands.api";

interface Product {
  _id: string;
  name: string;
  price: number;
  size: string[];
  color: string[];
  brand: string[];
  image: string;
}

const sizes = ["s", "m", "xl", "xxl"];
const colors = ["white", "purple", "blue", "black"];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
const [priceRange, setPriceRange] = useState<number[]>([500, 2500]);

  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(4);
  console.log(limit)

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
    } else if (data) {
      setProducts(data?.data);
    }
  }, [selectedSizes, data]);

  useEffect(() => {
    if (selectedColors.length > 0) {
      fetchProductbycolor(selectedColors).then((response) => {
        setProducts(response);
      });
    } else if (data) {
      setProducts(data?.data);
    }
  }, [selectedColors, data]);
  useEffect(() => {
    if (selectedBrands.length > 0) {
      fetchProductbybrand(selectedBrands).then((response) => {
        setProducts(response);
      });
    } else if (data) {
      setProducts(data?.data);
    }
  }, [selectedBrands, data]);

  const mutation = useMutation(deletedProduct, {
    onSuccess: () => {
      toast.error("Product has been deleted");
      refetch();
    },
  });

  useEffect(() => {
    const handleSearch = (searchTerm: string) => {
      if (searchTerm === "") {
        setProducts(originalProducts);
      } else {
        const searchedProducts = originalProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(searchedProducts);
      }
    };

    handleSearch(searchTerm);
  }, [searchTerm, originalProducts]);
  useEffect(() => {
    if (data) {
      const filteredByPrice = data.data.filter(
        (product: Product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      setProducts(filteredByPrice);
    }
  }, [priceRange, data]);


  const handleSizeChange = (size: string) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prevBrands) =>
      prevBrands.includes(brand)
        ? prevBrands.filter((c) => c !== brand)
        : [...prevBrands, brand]
    );
  };
  const handlePriceRangeChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange(newValue);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box
        mt={4}
        mb={2}
        display="flex"
        height={"auto"}
        gap={2}
        alignItems={"start"}
      >
        <Box
          sx={{
            width: 200,
            p: 1,
            mt: 4,
            borderRight: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Filter by Size */}
          <Typography
            variant="body1"
            gutterBottom
            fontWeight={"bold"}
            sx={{ borderBottom: "2px solid #ddd" }}
          >
            Filter by Size
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              {sizes.map((size) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                    />
                  }
                  label={size}
                  key={size}
                />
              ))}
            </FormGroup>
          </FormControl>

          {/* Filter by Color */}
          <Typography
            variant="body1"
            gutterBottom
            mt={1}
            fontWeight={"bold"}
            sx={{ borderBottom: "2px solid #ddd" }}
          >
            Filter by Color
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              {colors.map((color) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedColors.includes(color)}
                      onChange={() => handleColorChange(color)}
                    />
                  }
                  label={color}
                  key={color}
                />
              ))}
            </FormGroup>
          </FormControl>
          {/* Filter by Price Range */}
          <Typography
            variant="body1"
            gutterBottom
            mt={1}
            fontWeight={"bold"}
            sx={{ borderBottom: "2px solid #ddd" }}
          >
            Filter by Price
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) =>
              handlePriceRangeChange(newValue as number[])
            }
            valueLabelDisplay="auto"
            min={500}
            max={2500}
            step={100}
            sx={{ width: "50%", mt: 2, color: "teal" }}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </Typography>

          {/* Filter by Brand */}
          <Typography
            variant="body1"
            gutterBottom
            mt={1}
            fontWeight={"bold"}
            sx={{ borderBottom: "2px solid #ddd" }}
          >
            Filter by Brand
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              {["Levis", "Nike", "Mufti", "Adidas"].map((brand) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                  }
                  label={brand}
                  key={brand}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
        {/* sidebar ends */}

        {/* Products section */}
        <Container maxWidth="lg">
          <Box display={"flex"} justifyContent={"space-between"}>
            {" "}
            <Button
              component={Link}
              to="/create"
              variant="contained"
              color="warning"
              sx={{ bgcolor: "purple", m: 2 }}
            >
              Add Product
            </Button>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <TextField
                variant="outlined"
                placeholder="Search products here..."
                sx={{ mb: 2 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  inputProps: {
                    style: {
                      padding: "5px 8px",
                      width: "230px",
                    },
                  },
                }}
              />
            </Box>
          </Box>
          <Grid container spacing={3}>
            {products &&
              products.slice(0, limit).map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper elevation={3}>
                    <Box
                      sx={{
                        overflow: "hidden",
                        borderRadius: 1,
                      }}
                    >
                      <img
                        src={product_img(product.image)}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </Box>
                    <Box sx={{ px: 2, pt: 1, pb: 1 }}>
                      <Typography
                        variant="body1"
                        component="div"
                        fontWeight={"bold"}
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="body1" component="div">
                        <b>Sizes: </b>
                        {product.size.join(", ")}
                      </Typography>
                      <Typography variant="body1" component="div">
                        <b>Colors: </b>
                        {product.color.join(", ")}
                      </Typography>
                      <Typography variant="body1" component="div">
                        <b>Brand</b>: {product.brand}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: 1,
                        }}
                      >
                        <Button
                          component={Link}
                          to={`/update/${product._id}`}
                          variant="contained"
                          sx={{
                            textDecoration: "none",
                            color: "white",
                            marginRight: 1,
                            backgroundColor: "teal",
                          }}
                        >
                          Edit
                        </Button>
                        {localStorage.getItem("token") &&
                          localStorage.getItem("token") !== undefined && (
                            <Button
                              onClick={() => {
                                mutation.mutateAsync(product._id);
                              }}
                              variant="contained"
                              color="error"
                              sx={{ textDecoration: "none", color: "white" }}
                            >
                              Delete
                            </Button>
                          )}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: "gray",
                        p: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Link
                        to={`/product/${product._id}`}
                        style={{
                          color: "white",
                          textAlign: "right",
                          textDecoration: "none",
                        }}
                      >
                        See Details
                      </Link>
                      <ArrowForwardIcon
                        sx={{ color: "white", cursor: "pointer" }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              ))}
            {products.length === 0 && (
              <Typography variant="body1" mt={3}>
                No products available
              </Typography>
            )}
          </Grid>
          <Box
            maxWidth="xl"
            display="flex"
            justifyContent={"center"}
            mt={4}
            mb={4}
            gap={2}
          >
            <Button
              variant="contained"
              color="inherit"

              onClick={() => {
                if (limit > products.length) {
                  setLimit(products.length);
                } else {
                  setLimit(limit + 4);
                }
              }}
            >
              Show More
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                if (limit < 1) {
                  setLimit(4);
                }
                if (limit > 4) {
                  setLimit(limit - 4);
                }
              }}
            >
              Show Less
            </Button>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}
