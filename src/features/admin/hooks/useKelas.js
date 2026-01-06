import { useState, useEffect } from "react";
import { kelasApi } from "../../../services/api/kelas.api";

export const useKelas = () => {
  const [kelas, setKelas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchKelas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await kelasApi.getAll();
      setKelas(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat data kelas");
    } finally {
      setLoading(false);
    }
  };

  const createKelas = async (kelasData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await kelasApi.create(kelasData);
      await fetchKelas();
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Gagal membuat kelas");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateKelas = async (id, kelasData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await kelasApi.update(id, kelasData);
      await fetchKelas();
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengupdate kelas");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteKelas = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await kelasApi.delete(id);
      await fetchKelas();
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menghapus kelas");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKelas();
  }, []);

  return {
    kelas,
    loading,
    error,
    fetchKelas,
    createKelas,
    updateKelas,
    deleteKelas,
  };
};
