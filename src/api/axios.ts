import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
  if (!config.url) return config;

  // Set Content-Type for news creation and update requests
  if ((config.url.includes("/admin/news") && (config.method === "post" || config.method === "put"))) {
    config.headers['Content-Type'] = 'application/json';
  }

  if (config.url.startsWith("/admin")) {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});