import axios from "axios";
import { toast } from "react-hot-toast";

const tokenStr = localStorage.getItem("gesToken")
  ? localStorage.getItem("gesToken")
  : null;

const api = axios.create({
  baseURL: `https://api.alchilazo.com.gt/api/`,
  headers: {
    Authorization: `Bearer ${tokenStr}`
  }
});

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    toast.error(error.response.data.error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
