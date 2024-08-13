import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useMutation } from "react-query";
import { loginUser } from "../../../Api/Queries/loginUser.api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { profile_pic } from "../../../helper/axiosInstance";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      toast.success(data?.message);
      if (data === undefined) {
        toast.error("login unsuccessfull");
      }
      localStorage.setItem("token", data?.token);
      localStorage.setItem("profile", profile_pic(data?.user?.image));
      localStorage.setItem("username", data?.user?.name);
      if (data !== undefined) {
        navigate("/");
      }
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 20,
        p: 4,
        mb: 30,
        border: "1px solid #ddd",
        borderRadius: 4,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom textAlign={"center"}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Typography variant="body2" my={1} textAlign={"right"}>
          Don't have an account? create one{" "}
          <Link to={"/register"}>register</Link>
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, bgcolor: "teal" }}
        >
          Login
        </Button>
      </form>
      {mutation.isLoading && <Typography>Loading...</Typography>}
    </Box>
  );
};

export default Login;
