import axiosInstance from "../../helper/axiosInstance";

export const verfifyEmail = async (email,token) => {
  try {
    const response = await axiosInstance.get(`/confirmation/${email}/${token}`);
    console.log(response?.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

