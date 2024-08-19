import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { forgotPassword } from "../../../Api/Queries/forgotPassword.api";
import { toast } from "react-toastify";

interface FPInputs {
  email: string;
}

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FPInputs>();

  const mutation = useMutation(forgotPassword, {
    onSuccess: (data) => {
      toast.success(data?.message);
          // Uncomment this if you want to navigate after success
          console.log(data)
     
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    },
  });

  const onSubmit: SubmitHandler<FPInputs> = (data) => {
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
      <Typography variant="h5" component="h1" gutterBottom textAlign="center">
        Forgot Password
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

        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, bgcolor: "teal" }}
          loading={mutation.isLoading}
          loadingIndicator="Submitting..."
        >
          Submit
        </LoadingButton>
      </form>
    </Box>
  );
}
