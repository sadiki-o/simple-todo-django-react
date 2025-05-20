import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Loaded from .env
});
console.log("port: ", import.meta.env.VITE_API_BASE_URL);
// Add access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token if access token fails
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refresh = localStorage.getItem("refresh_token");

      if (refresh) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/token/refresh/`,
            {
              refresh,
            }
          );

          const newAccess = response.data.access;
          localStorage.setItem("access_token", newAccess);

          err.config.headers.Authorization = `Bearer ${newAccess}`;
          return api(err.config);
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
          localStorage.clear();
          window.location.href = "/login";
        }
      } else {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default api;
