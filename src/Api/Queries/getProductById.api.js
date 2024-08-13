import axiosInstance from "../../helper/axiosInstance";

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/product/${id}`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
