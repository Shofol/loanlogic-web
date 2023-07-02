import axios from "axios";
import { toast } from "react-hot-toast";

const tokenStr = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwicm9sZSI6Ikdlc3RvciBjb21lcmNpYWwiLCJhZ2VuY3kiOiJDT0JBTiIsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiY2hpbGF6b0BtYWlsZHJvcC5jYyIsImRhdGVfb2ZfYmlydGgiOiIxOTkwLTAxLTAxVDAwOjAwOjAwLjAwMFoiLCJpc19hY3RpdmUiOnRydWUsInBob25lIjoiKzkyMzAzNjczMjMwNCIsInN0YXJ0X2RhdGUiOiIyMDIzLTA0LTEyVDAwOjAwOjAwLjAwMFoiLCJjYXRlZ29yeSI6IkVYUEVSVE8iLCJmYW1pbHlfbmFtZSI6InRrYUFBQUFBQSIsInBhc3N3b3JkIjoiJDJiJDEwJG5zMWtRd2lreWM1NTVQZXJUTENvdy5ZemFTa0h2YU5LaWoyZHY4V24zN3VodDRaRGl3YzRDIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0wMlQxNDozNzowNS44MDVaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0wMlQxNDozNzowNS44MDVaIn0sImlhdCI6MTY4ODMwODY0MCwiZXhwIjoxNjg4Mzk1MDQwfQ.RrqoaEgiTBxYf6y7c31rZAb3y1ZVbbXVxFAx-e4Z9uo`;

const api = axios.create({
  baseURL: `http://testing.api.alchilazo.com.gt/api/`,
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
