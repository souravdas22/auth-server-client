import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputLabel,
  Input,
} from "@mui/material";
import { useMutation } from "react-query";
import { registerUser } from "../../../Api/Queries/registerUser.api";
import { Link, useNavigate } from "react-router-dom";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  mobile: string;
  image?: FileList;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const mutation = useMutation(async (data: RegisterFormInputs) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("mobile", data.mobile);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); 
    }
    await registerUser(formData);
  }, {
    onSuccess: () => {
    navigate('/login')
  }});

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 4,
        mb:6,
        border: "1px solid #ddd",
        borderRadius: 4,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom textAlign={'center'}>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Mobile"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("mobile", { required: "Mobile number is required" })}
          error={!!errors.mobile}
          helperText={errors.mobile?.message}
        />
        <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
        <Input
          id="image-upload"
          type="file"
          inputProps={{ accept: "image/*" }}
          {...register("image")}
        />
        <Typography variant="body2" my={1} textAlign={"right"}>
          Already have an account? 
          <Link to={"/login"} >login</Link>
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, bgcolor: "teal" }}
        >
          Register
        </Button>
      </form>
      {mutation.isLoading && <Typography>Loading...</Typography>}

      {mutation.isSuccess && <Typography>Registration successful!</Typography>}
    </Box>
  );
};

export default Register;
