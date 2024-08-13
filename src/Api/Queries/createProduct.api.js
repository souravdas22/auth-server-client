import axiosInstance from "../../helper/axiosInstance";

export const createProduct = async (data, id) => {
  try {
    const response = await axiosInstance.post(`/create`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
