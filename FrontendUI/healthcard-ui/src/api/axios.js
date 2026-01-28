import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5133",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.warn("Session expired or invalid.");
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;