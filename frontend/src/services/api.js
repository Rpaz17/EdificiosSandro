import axios from "axios";
import { getToken } from "../services/auth.api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  console.log(token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
