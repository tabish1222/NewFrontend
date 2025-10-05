// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-schoolapp.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
