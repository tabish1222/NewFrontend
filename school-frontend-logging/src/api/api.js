import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-schoolapp.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("📤 API Request:", config.method.toUpperCase(), config.url, config.data || "");
  return config;
});

API.interceptors.response.use(
  (res) => {
    console.log("✅ API Response:", res.config.url, res.status, res.data);
    return res;
  },
  (err) => {
    console.error("❌ API Error:", err.response?.status, err.response?.data);
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default API;
