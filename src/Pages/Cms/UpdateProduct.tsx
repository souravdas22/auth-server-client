import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Box,
  InputLabel,
  Input,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";
import { getProductById } from "../../Api/Queries/getProductById.api";
import { updateProduct } from "../../Api/Queries/updateProduct.api";

interface IProductForm {
  name: string;
  price: number;
  size: string[];
  color: string[];
  image: FileList | null; // To handle file input
}

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(["product", id], () => getProductById(id || ""));
  const { register, handleSubmit, setValue, watch } = useForm<IProductForm>({
    defaultValues: {
      name: "",
      price: 0,
      size: [],
      color: [],
      image: null,
    },
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("price", data.price);
      setValue("size", data.size);
      setValue("color", data.color);
    }
  }, [data, setValue]);

  const mutation = useMutation(updateProduct, {
    onSuccess: () => {
      toast.success("Product updated successfully");
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to update product");
    },
  });

  const onSubmit = (formData: IProductForm) => {
    console.log(formData?.image)
    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("price", formData.price.toString());
    formData.size.forEach((size) => productData.append("size", size));
    formData.color.forEach((color) => productData.append("color", color));
    if (formData.image && formData.image.length > 0) {
      productData.append("image", formData.image[0]); 
    }

    mutation.mutate({ formData: productData, id });
  };

  const selectedSizes = watch("size", []);
  const selectedColors = watch("color", []);

  return (
    <Container maxWidth="sm">
      <Box margin={"7rem 0"}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Product Name */}
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("name", { required: true })}
          />

          {/* Product Price */}
          <TextField
            label="Product Price"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            {...register("price", { required: true })}
          />

          {/* Product Size */}
          <Typography variant="subtitle1" gutterBottom>
            Size:
          </Typography>
          <FormGroup row>
            {["s", "m", "l", "xl", "xxl"].map((size) => (
              <FormControlLabel
                control={
                  <Checkbox
                    value={size}
                    {...register("size")}
                    checked={selectedSizes.includes(size)}
                  />
                }
                label={size}
                key={size}
              />
            ))}
          </FormGroup>

          {/* Product Color */}
          <Typography variant="subtitle1" gutterBottom>
            Color:
          </Typography>
          <FormGroup row>
            {["red", "green", "blue"].map((color) => (
              <FormControlLabel
                control={
                  <Checkbox
                    value={color}
                    {...register("color")}
                    checked={selectedColors.includes(color)}
                  />
                }
                label={color}
                key={color}
              />
            ))}
          </FormGroup>

          {/* Product Image */}
          <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
          <Input
            id="image-upload"
            type="file"
            inputProps={{ accept: "image/*" }}
            {...register("image")}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ bgcolor: "teal" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}
