import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputLabel,
  Input,
  CircularProgress,
} from "@mui/material";
import { useMutation } from "react-query";
import { registerUser } from "../../../Api/Queries/registerUser.api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  image?: FileList;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const mutation = useMutation(registerUser, {
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message)
    }
    }
  }
  );

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("mobile", data.mobile);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Confirm password does not match");
    } else {
      mutation.mutate(formData);
      
    }
   
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 4,
        mb: 6,
        border: "1px solid #ddd",
        borderRadius: 4,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom textAlign={"center"}>
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
          InputProps={{
            inputProps: {
              style: {
                padding: "12px 8px",
              },
            },
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            inputProps: {
              style: {
                padding: "12px 8px",
              },
            },
          }}
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
          InputProps={{
            inputProps: {
              style: {
                padding: "12px 8px",
              },
            },
          }}
        />
        {/* confirm password  */}
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            inputProps: {
              style: {
                padding: "12px 8px",
              },
            },
          }}
        />
        <TextField
          label="Mobile"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("mobile", { required: "Mobile number is required" })}
          error={!!errors.mobile}
          helperText={errors.mobile?.message}
          InputProps={{
            inputProps: {
              style: {
                padding: "12px 8px",
              },
            },
          }}
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
          <Link to={"/login"}>login</Link>
        </Typography>

        {mutation.isLoading ? (
          <LoadingButton
            loading
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, bgcolor: "teal", py: 2 }}
            loadingIndicator={<CircularProgress color="inherit" size={24} />}
          />
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, bgcolor: "teal" }}
          >
            Register
          </Button>
        )}
      </form>
    </Box>
  );
};

export default Register;
