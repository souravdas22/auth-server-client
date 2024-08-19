import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post(`/login`, data);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    }
};
