import { useState, useEffect } from "react";
import { materiApi } from "../../../services/api/materi.api";
import { toast } from "react-hot-toast";

export const useMaterial = (kelasId) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMaterials = async () => {
    if (!kelasId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await materiApi.getByKelas(kelasId);
      setMaterials(response.data || []);
    } catch (err) {
      const message = err.response?.data?.message || "Gagal memuat materi";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [kelasId]);

  return {
    materials,
    loading,
    error,
    refetch: fetchMaterials,
  };
};
