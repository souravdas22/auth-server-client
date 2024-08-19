import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import axiosInstance from "../../helper/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import { toast } from "react-toastify";
interface ConfirmationType {
  status: number;
  message: string;
}

export default function ConfirmationPage() {
  const { email, token } = useParams();
  const [data, setdata] = useState<ConfirmationType>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(
          `/confirmation/${email}/${token}`
        );
        setdata(res?.data);
        return res.data;
      } catch (err:any) {
       toast.error(err?.response?.data?.message)
      }
    };

    fetchProduct();
  }, [email, token]);

  if (data?.status === 200) {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }
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
        {data && data.status === 200 ? (
          <>
            <Box>
              <CheckCircleOutlineOutlinedIcon
                sx={{ fontSize: "3rem", color: "green" }}
              />
            </Box>
            <Typography variant="h4">User Verified</Typography>
            <Typography variant="h6">{data?.message}</Typography>
          </>
        ) : (
          <>
            <Box>
              <GppMaybeOutlinedIcon sx={{ fontSize: "3rem", color: "red" }} />
            </Box>
            <Typography variant="h4">User Verification Unsuccessful</Typography>
            <Typography variant="h6">{data?.message}</Typography>
          </>
        )}
      </Box>
    </Container>
  );
}
