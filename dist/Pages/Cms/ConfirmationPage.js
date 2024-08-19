import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import axiosInstance from "../../helper/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import { toast } from "react-toastify";
export default function ConfirmationPage() {
    const { email, token } = useParams();
    const [data, setdata] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            var _a, _b;
            try {
                const res = await axiosInstance.get(`/confirmation/${email}/${token}`);
                setdata(res === null || res === void 0 ? void 0 : res.data);
                return res.data;
            }
            catch (err) {
                toast.error((_b = (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message);
            }
        };
        fetchProduct();
    }, [email, token]);
    if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }
    return (_jsx(Container, { children: _jsx(Box, { sx: {
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }, children: data && data.status === 200 ? (_jsxs(_Fragment, { children: [_jsx(Box, { children: _jsx(CheckCircleOutlineOutlinedIcon, { sx: { fontSize: "3rem", color: "green" } }) }), _jsx(Typography, { variant: "h4", children: "User Verified" }), _jsx(Typography, { variant: "h6", children: data === null || data === void 0 ? void 0 : data.message })] })) : (_jsxs(_Fragment, { children: [_jsx(Box, { children: _jsx(GppMaybeOutlinedIcon, { sx: { fontSize: "3rem", color: "red" } }) }), _jsx(Typography, { variant: "h4", children: "User Verification Unsuccessful" }), _jsx(Typography, { variant: "h6", children: data === null || data === void 0 ? void 0 : data.message })] })) }) }));
}
