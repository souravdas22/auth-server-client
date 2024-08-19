import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const deletedProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/delete/${id}`);
    return response?.data?.data;
  } catch (error) {
   toast.error(error?.response?.data?.message);
  }
};
