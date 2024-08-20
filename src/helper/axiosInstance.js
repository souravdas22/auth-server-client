import axios from "axios";
let adminUrl = "https://auth-crud-server-1.onrender.com/api";

export const baseURL = adminUrl;
let axiosInstance = axios.create({
  baseURL,
});

export { adminUrl };

export const profile_pic = (media) => {
  return `https://auth-crud-server-1.onrender.com/${media}`;
};
export const product_img = (media) => {
  return `https://auth-crud-server-1.onrender.com/${media}`;
};

axiosInstance.interceptors.request.use(
  async function (config) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token !== null || token !== undefined) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
export default axiosInstance;
