import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { newPassword } from "../../../Api/Queries/newPassword.api";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../helper/axiosInstance";

interface FPInputs {
  newPassword: string;
  confirmNewPassword: string;
}

export default function NewPassword() {
  const { email, token } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(
          `/password-reset/confirmation/${email}/${token}`
        );
        toast.success(res?.data?.message);
        return res.data;
      } catch (err: any) {
        toast.error(err?.response?.data?.message);
      }
    };

    fetchProduct();
  }, [email, token]);
   
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FPInputs>();

  const mutation = useMutation(newPassword, {
    onSuccess: (data) => {
      toast.success(data?.message);

      if (data?.status === 200) {
        navigate("/login");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    },
  });

  const onSubmit: SubmitHandler<FPInputs> = (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Confirm password does not match");
    } else {
      mutation.mutate({ data, email });
    }
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
        Create New Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          {...register("newPassword", { required: "NewPassword is required" })}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
        />
        <TextField
          label="Confirm New Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          {...register("confirmNewPassword", {
            required: "Confirm New Password is required",
          })}
          error={!!errors.confirmNewPassword}
          helperText={errors.confirmNewPassword?.message}
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
