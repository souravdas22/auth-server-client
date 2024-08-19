import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Typography, Box, Paper, Button, Grid } from "@mui/material";
import axiosInstance, { product_img } from "../../helper/axiosInstance"; 
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface Product {
  _id: string;
  name: string;
  price: number;
  size: string[];
  color: string[];
  brand: string;
  description: string;
  image: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  console.log(product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/product/${id}`);
        setProduct(response?.data?.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Box
        mt={4}
        mb={2}
        height={"80vh"}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Paper elevation={3}>
          <Grid container spacing={2} padding={2}>
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <img
                src={product_img(product.image)}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={6} position={"relative"}>
              <Box padding={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>Price: </b>₹{product.price}
                </Typography>
                <Typography variant="body1" paragraph>
                  <b>Sizes:</b> {product.size.join(", ")}
                </Typography>
                <Typography variant="body1" paragraph>
                  <b>Colors:</b> {product.color.join(", ")}
                </Typography>
                <Typography variant="body1" paragraph>
                  <b>Brand:</b> {product.brand}
                </Typography>
                <Typography variant="body1" paragraph>
                  <b>Description:</b> {product.description}
                </Typography>
              </Box>
              <Box mt={2} position={"absolute"} bottom={0} right={0}>
                <Button
                  component={Link}
                  to="/products"
                  variant="outlined"
                  sx={{
                    bgcolor: "teal",
                    color: "white",
                    transition:
                      "background-color 0.4s ease, color 0.3s ease, border-color 0.3s ease,scale 0.3s ease",
                    "&:hover": {
                      bgcolor: "darkgreen",
                      scale: "1.02",
                    },
                  }}
                >
                  <ArrowBackIosIcon sx={{ fontSize : "15px" }} /> Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductDetails;
