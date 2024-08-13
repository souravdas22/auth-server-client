import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Container,
  Typography,
  Box,
  InputLabel,
  Input,
} from "@mui/material";
import { useMutation } from "react-query";
import { createProduct } from "../../Api/Queries/createProduct.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ProductFormInputs {
  name: string;
  price: number;
  size: string[];
  color: string[];
  image: FileList | null; // To handle file input
}

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, register } = useForm<ProductFormInputs>({
    defaultValues: {
      name: "",
      price: 0,
      size: [],
      color: [],
      image: null,
    },
  });

  const mutation = useMutation(createProduct, {
    onSuccess: () => {
      toast.success("Product created successfully");
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to create product");
    },
  });

  const onSubmit = (formData: ProductFormInputs) => {
    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("price", formData.price.toString());
    formData.size.forEach((size) => productData.append("size", size));
    formData.color.forEach((color) => productData.append("color", color));
    if (formData.image && formData.image.length > 0) {
      productData.append("image", formData.image[0]); // Only append the first file
    }

    mutation.mutate(productData);
  };

  return (
    <Container maxWidth="sm">
      <Box p={5} boxShadow={3} borderRadius={2} margin={"50px 0"}>
        <Typography variant="h4" align="center">
          Create Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Product Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
            )}
          />

          {/* Product Price */}
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="Price"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
            )}
          />

          {/* Product Size */}
          <Typography variant="h6">Size:</Typography>
          <FormGroup row>
            {["s", "m", "l", "xl", "xxl"].map((size) => (
              <FormControlLabel
                key={size}
                control={
                  <Controller
                    name="size"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        value={size}
                        checked={field.value.includes(size)}
                        onChange={(e) =>
                          field.onChange(
                            e.target.checked
                              ? [...field.value, size]
                              : field.value.filter((v) => v !== size)
                          )
                        }
                      />
                    )}
                  />
                }
                label={size}
              />
            ))}
          </FormGroup>

          {/* Product Color */}
          <Typography variant="h6">Color:</Typography>
          <FormGroup row>
            {["red", "green", "blue"].map((color) => (
              <FormControlLabel
                key={color}
                control={
                  <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        value={color}
                        checked={field.value.includes(color)}
                        onChange={(e) =>
                          field.onChange(
                            e.target.checked
                              ? [...field.value, color]
                              : field.value.filter((v) => v !== color)
                          )
                        }
                      />
                    )}
                  />
                }
                label={color}
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
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ bgcolor: "teal" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ProductForm;
