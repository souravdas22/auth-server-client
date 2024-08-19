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
  FormControl,
  Select,
  MenuItem,
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
  brand: string;
  description: string;
  image: FileList | null; 
}

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, register } = useForm<ProductFormInputs>({
    defaultValues: {
      name: "",
      price: 0,
      size: [],
      color: [],
      brand: '',
      description:'',
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
  

  const onSubmit = (formData: ProductFormInputs) => {
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

  return (
    <Container maxWidth="sm">
      <Box px={4} py={2} boxShadow={3} borderRadius={2} margin={"20px 0"}>
        <Typography variant="h4" align="center">
          Create Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                InputProps={{
                  inputProps: {
                    style: {
                      padding: "10px 8px",
                    },
                  },
                }}
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
                InputProps={{
                  inputProps: {
                    style: {
                      padding: "10px 8px",
                    },
                  },
                }}
              />
            )}
          />

          {/* Product Size */}
          <Typography variant="body1">Size:</Typography>
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
          <Typography variant="body1">Color:</Typography>
          <FormGroup row>
            {["white", "purple", "blue", "black"].map((color) => (
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
          {/* Product brand */}
          <Typography variant="body1">Brand:</Typography>
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

          <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
          <Input
            id="image-upload"
            type="file"
            inputProps={{ accept: "image/*" }}
            {...register("image")}
          />

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
