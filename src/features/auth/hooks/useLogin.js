import { useState, useCallback } from "react";
import { login as apiLogin } from "@/services/api/auth.api";
import { setTokens } from "@/services/storage/token";

/**
 * useLogin hook
 * - login(credentials, { onSuccess }) => calls API, saves tokens, returns response
 * - exposes loading and error state
 */
export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (credentials, options = {}) => {
    setError(null);
    setLoading(true);
    try {
      const res = await apiLogin(credentials);

      // try common token shapes
      const access =
        res?.accessToken ||
        res?.access_token ||
        res?.token ||
        res?.data?.accessToken;
      const refresh =
        res?.refreshToken || res?.refresh_token || res?.data?.refreshToken;

      if (access) setTokens({ accessToken: access, refreshToken: refresh });

      // Simpan token, user data, dan roles ke localStorage
      if (res?.access_token) {
        localStorage.setItem("token", res.access_token);
      }
      if (res?.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      if (res?.roles) {
        localStorage.setItem("roles", JSON.stringify(res.roles));
      }

      if (typeof options.onSuccess === "function") options.onSuccess(res);
      return res;
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Login failed";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading, error, setError };
}
