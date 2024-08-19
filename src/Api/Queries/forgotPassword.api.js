import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const forgotPassword = async (data) => {
  try {
    const response = await axiosInstance.post(`/forget-password`, data);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
