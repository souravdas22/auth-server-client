import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
// import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import axiosInstance from "../../helper/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// interface ConfirmationType {
//   status: number;
//   message: string;
//   id: string;
// }

export default function ResetConfirmation() {
  const { email, token } = useParams();
  // const [data, setdata] = useState<ConfirmationType>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(
          `/password-reset/${email}/${token}`
        );
        toast.success(res?.data?.message);
        navigate(`/password-reset/${res?.data?.id}`);
        // setdata(res?.data);
        return res.data;
      } catch (err: any) {
        // setdata(err?.response?.data?.message);
        toast.error(err?.response?.data?.message);
       
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
        {/* {data && data.status === 200 && (
          <>
            <Box>
              <CheckCircleOutlineOutlinedIcon
                sx={{ fontSize: "3rem", color: "green" }}
              />
            </Box>
            <Typography variant="h4">User Verified</Typography>
            <Typography variant="h6">{data?.message}</Typography>
          </>
        )} */}

      </Box>
    </Container>
  );
}
