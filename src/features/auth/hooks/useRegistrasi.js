import { useState } from "react";
import { register as apiRegister } from "@/services/api/auth.api";

export default function useRegistrasi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (data) => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiRegister(data);
      setLoading(false);
      return response;
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Registration failed";
      setError(msg);
      setLoading(false);
      throw err;
    }
  };

  return { register, loading, error, setError };
}
