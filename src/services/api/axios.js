// services/api/axios.js
import axios from "axios";
import { getToken, removeToken } from "../storage/token";

// Vite: gunakan import.meta.env dan prefix VITE_
// fallback: undefined jika tidak diset
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

if (!API_BASE_URL) {
  if (import.meta.env.DEV) {
    // Fail-fast di development agar developer segera mengatur .env
    throw new Error(
      "Missing environment variable VITE_API_BASE_URL. Set it in your .env file."
    );
  } else {
    // Production: log saja, axios akan menggunakan relative paths jika baseURL undefined
    console.error(
      "VITE_API_BASE_URL not set. Requests will use relative paths."
    );
  }
}

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// ⬇️ Interceptor: Tambahkan token otomatis
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ⬇️ Interceptor: Handle error global (token expired, dll)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired → logout auto
      removeToken();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
