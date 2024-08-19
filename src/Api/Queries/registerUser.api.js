import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post(`/register`, formData);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
