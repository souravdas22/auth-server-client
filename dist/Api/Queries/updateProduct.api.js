import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";
export const updateProduct = async (data) => {
    var _a, _b;
    try {
        const response = await axiosInstance.post(`/update/${data === null || data === void 0 ? void 0 : data.id}`, data === null || data === void 0 ? void 0 : data.formData);
        return response === null || response === void 0 ? void 0 : response.data;
    }
    catch (error) {
        toast.error((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message);
    }
};
