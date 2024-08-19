import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const updateProduct = async (data) => {
    try {
    const response = await axiosInstance.post(
      `/update/${data?.id}`,
      data?.formData
    );
    return response?.data;
  } catch (error) {
     toast.error(error?.response?.data?.message);
  }
};
