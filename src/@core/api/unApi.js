import axios from "axios";
import { toast } from "react-hot-toast";

const unApi = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL
});

unApi.interceptors.response.use(
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

export default unApi;
