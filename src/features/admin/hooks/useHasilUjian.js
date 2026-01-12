import { useState, useEffect } from "react";
import axios from "@/services/api/axios";
import { toast } from "react-hot-toast";

export const useHasilUjian = () => {
  const [hasilList, setHasilList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHasil = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/hasil-ujian");
      const data = res?.data?.data ?? res?.data ?? [];
      setHasilList(data);
    } catch (err) {
      const msg = err.response?.data?.message || "Gagal memuat hasil ujian";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHasil();
  }, []);

  const deleteHasil = async (id) => {
    try {
      await axios.delete(`/hasil-ujian/${id}`);
      toast.success("Hasil ujian berhasil dihapus");
      fetchHasil();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus hasil ujian");
    }
  };

  return {
    hasilList,
    loading,
    error,
    deleteHasil,
    refetch: fetchHasil,
  };
};
