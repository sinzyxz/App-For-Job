import axios from "axios";

const API = axios.create({
  baseURL: "https://app-for-job.onrender.com/api",
});

// Interceptor แปะ Token ไปใน Request Header
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;