import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const fetchProductbycolor = async (selectedColors) => {
  try {
    const colorQuery =
      selectedColors &&
      selectedColors.map((color) => encodeURIComponent(color)).join(",");

    const response = await axiosInstance.get(
      `/product/filter/color?color=${colorQuery}`
    );

    return response?.data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
