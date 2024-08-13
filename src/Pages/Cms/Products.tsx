import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { getProducts } from "../../Api/Queries/products.api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { deletedProduct } from "../../Api/Queries/deleteProduct.api";

interface Product {
  _id: string;
  name: string;
  price: number;
  size: string[];
  color: string[];
  image: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const { data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  // delete
  const mutation = useMutation(deletedProduct, {
    onSuccess: (data) => {
      toast.error("product is now deleted");

      refetch();
    },
  });

  useEffect(() => {
    if (data) {
      setProducts(data?.data);
    }
  }, [data]);

  return (
    <Container>
      <Box mt={4} height={"600px"}>
        <Typography variant="h4" align="center" gutterBottom>
          Product Table
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Button
            component={Link}
            to="/create"
            variant="contained"
            color="warning"
            sx={{ bgcolor: "purple" }}
          >
            Add Product
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Sl.No</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Size</TableCell>
                <TableCell align="center">Color</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">₹ {product.price}</TableCell>
                  <TableCell align="center">
                    {product.size.join(", ")}
                  </TableCell>
                  <TableCell align="center">
                    {product.color.join(", ")}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={`http://localhost:7000/${product.image}`}
                      alt="img"
                      style={{
                        height: "50px",
                        width: "50px",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
