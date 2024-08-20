import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
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
  FormControl,
  Select,
  MenuItem,
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
  brand: "";
  description: "";
  image: FileList | null; 
}

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(["product", id], () => getProductById(id || ""));
  const { register, handleSubmit, setValue, watch,control } = useForm<IProductForm>({
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

  const onSubmit = (formData: IProductForm) => {
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

  return (
    <Container maxWidth="sm">
      <Box my={2} boxShadow={3} borderRadius={2} py={2} px={4}>
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
            InputProps={{
              inputProps: {
                style: {
                  padding: "10px 8px",
                },
              },
            }}
          />

          {/* Product Price */}
          <TextField
            label="Product Price"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            {...register("price", { required: true })}
            InputProps={{
              inputProps: {
                style: {
                  padding: "10px 8px",
                },
              },
            }}
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
            {["white", "purple", "blue", "black"].map((color) => (
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
          {/* Product brand */}
          <Typography variant="body1" my={1}>
            Brand:
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="brand-label">Brand</InputLabel>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="brand-label"
                  label="Brand"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {["Levis", "Nike", "Mufti", "Adidas"].map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          {/* description */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Description"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                multiline
                rows={3}
              />
            )}
          />

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
