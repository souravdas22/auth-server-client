import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";


export const fetchProductbysize = async(selectedSizes) => {
  try {
    const sizeQuery = selectedSizes&&selectedSizes
      .map((size) => encodeURIComponent(size))
      .join(",");
    // console.log(sizeQuery)

    const response = await axiosInstance.get(
      `/product/filter/size?size=${sizeQuery}`
    );
    // console.log(response.data);

    return response?.data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};