import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const newPassword = async ({data,email}) => {
  try {
    console.log(data,email);
    const response = await axiosInstance.post(
      `/new-password/${email}`,
      data
    );
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
