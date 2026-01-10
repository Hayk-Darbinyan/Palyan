import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
  if (!config.url) return config;

  if (config.url.startsWith("/admin")) {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});