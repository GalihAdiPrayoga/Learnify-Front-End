import { useState, useEffect } from "react";
import { soalApi } from "@/services/api/soal.api";

export const useSoal = () => {
  const [Soal, setSoal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSoal = async () => {
    try {
      setLoading(true);
      const response = await soalApi.getAll();
      const payload = response?.data?.data ?? response?.data ?? [];
      setSoal(payload);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch soal");
      console.error("Error fetching soal:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoal();
  }, []);

  const createSoal = async (data) => {
    try {
      const response = await soalApi.create(data);
      const created = response?.data?.data ?? response?.data;
      setSoal((prev) => [...prev, created]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateSoal = async (id, data) => {
    try {
      const response = await soalApi.update(id, data);
      const updated = response?.data?.data ?? response?.data;
      setSoal((prev) => prev.map((item) => (item.id === id ? updated : item)));
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteSoal = async (id) => {
    try {
      const response = await soalApi.delete(id);
      // backend returns message only; update local state by removing item
      setSoal((prev) => prev.filter((item) => item.id !== id));
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  return {
    Soal,
    loading,
    error,
    createSoal,
    updateSoal,
    deleteSoal,
    refetch: fetchSoal,
  };
};
