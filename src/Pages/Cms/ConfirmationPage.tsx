import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import axiosInstance from "../../helper/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ConfirmationPage() {
  const { email, token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(
          `/confirmation/${email}/${token}`
        );
        toast.success(res.data?.message);
         navigate("/login");
        return res.data;
      } catch (err:any) {
        toast.error(err?.response?.data?.message)
        navigate('/login')
      }
    };

    fetchProduct();
  }, [email, token,navigate]);


  return (
    <Container>
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
       
      </Box>
    </Container>
  );
}
