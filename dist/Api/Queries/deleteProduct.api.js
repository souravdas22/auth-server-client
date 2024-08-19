import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";
export const deletedProduct = async (id) => {
    var _a, _b, _c;
    try {
        const response = await axiosInstance.get(`/delete/${id}`);
        return (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data;
    }
    catch (error) {
        toast.error((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message);
    }
};
