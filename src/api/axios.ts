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

  // Add Authorization header for admin routes
  if (config.url.startsWith("/admin") || config.url === "/auth/change-password") {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/login')) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("adminRefreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const formData = new URLSearchParams();
        formData.append("refresh_token", refreshToken);

        const response = await axios.post(`${apiUrl}/auth/refresh`, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const { access_token, refresh_token } = response.data;

        localStorage.setItem("adminToken", access_token);
        localStorage.setItem("adminRefreshToken", refresh_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, logout user
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRefreshToken");
        window.location.href = "/admin"; // Or use a more sophisticated way to redirect
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
