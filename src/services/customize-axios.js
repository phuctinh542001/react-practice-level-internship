import axios from "axios";

const instance = axios.create({
  baseURL: "https://reqres.in/",
  timeout: 2000,
  headers: { "X-Custom-Header": "foobar" },
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error) {
      return error;
    }
    return Promise.reject(error);
  }
);

export default instance;
