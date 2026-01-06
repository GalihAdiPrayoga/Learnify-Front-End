import api from "./axios";
import { removeToken, setToken } from "../storage/token";

/**
 * Login user.
 * @param {{email:string,password:string}} credentials
 * @returns {Promise<any>} response data
 */
export function login(credentials) {
  return api.post("/login", credentials).then((res) => {
    const { data } = res;

    // Simpan token
    if (data.token) {
      setToken(data.token);
    }

    // Simpan user_id ke localStorage
    if (data.user?.id) {
      localStorage.setItem("user_id", data.user.id.toString());
    }

    return data;
  });
}

/**
 * Register user.
 * @param {object} payload
 * @returns {Promise<any>} response data
 */
export function register(payload) {
  return api.post("/registrasi", payload).then((res) => res.data);
}

/**
 * Logout user: panggil endpoint logout lalu hapus token lokal.
 * Hapus token di finally agar selalu dijalankan meskipun request gagal.
 */
export async function logout() {
  try {
    await api.post("/logout");
  } finally {
    removeToken();
    localStorage.removeItem("user_id");
  }
}

/**
 * Ambil profil user saat ini.
 * @returns {Promise<any>}
 */
export function getProfile() {
  return api.get("/me").then((res) => res.data);
}

/**
 * Refresh token (jika backend mendukung).
 * @returns {Promise<any>}
 */
export function refreshToken() {
  return api.post("/refresh").then((res) => res.data);
}
