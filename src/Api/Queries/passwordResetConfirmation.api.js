import axiosInstance from "../../helper/axiosInstance";

export const verfifyResetEmail = async (email, token) => {
  try {
    const response = await axiosInstance.get(
      `/password-reset/verification/${email}/${token}`
    );
    console.log(response?.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};
