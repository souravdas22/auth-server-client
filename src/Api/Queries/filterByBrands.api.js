import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

export const fetchProductbybrand = async (selectedBrands) => {
  try {
    const brandQuery =
      selectedBrands &&
      selectedBrands.map((brand) => encodeURIComponent(brand)).join(",");

    const response = await axiosInstance.get(
      `/product/filter/brand?brand=${brandQuery}`
    );

    return response?.data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
