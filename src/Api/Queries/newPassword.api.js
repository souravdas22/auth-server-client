import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const newPassword = async ({data,id}) => {
    try {
    const response = await axiosInstance.post(`/new-password/${id}`, data);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
