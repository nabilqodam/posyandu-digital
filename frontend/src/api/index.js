import axios from "axios";

const url = "http://localhost:3000";

export const API = axios.create({
    baseURL : `${url}/api`
});

API.interceptors.request.use(
    (config) => {
      const token =
        localStorage.getItem("token");
  
      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );