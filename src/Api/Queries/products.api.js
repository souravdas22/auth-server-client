import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response?.data;
  } catch (error) {
     toast.error(error?.response?.data?.message);
  }
};
