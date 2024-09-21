import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const updatePassword = async ({ data,token }) => {
    try {
      console.log(data,token)
    const response = await axiosInstance.post(`/update-password`, data);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
