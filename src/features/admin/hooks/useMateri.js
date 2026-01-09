import { useState, useEffect } from "react";
import { materiApi } from "../../../services/api/materi.api";
import { toast } from "react-hot-toast";

export const useMateri = (kelasId) => {
  const [materiList, setMateriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMateri, setEditingMateri] = useState(null);

  // Fetch materi list
  const fetchMateri = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await materiApi.getAll(kelasId);
      setMateriList(response.data.data || []);
    } catch (err) {
      const msg = err.response?.data?.message || "Gagal memuat materi";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMateri();
  }, [kelasId]);

  // Create materi
  const createMateri = async (data) => {
    try {
      // prefer kelas_id from form if provided, otherwise fallback to hook's kelasId
      const payload = { ...data, kelas_id: data.kelas_id || kelasId };
      const response = await materiApi.create(payload);
      toast.success(response.message || "Materi berhasil ditambahkan");
      fetchMateri();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menambahkan materi");
      throw error;
    }
  };

  // Update materi
  const updateMateri = async (id, data) => {
    try {
      // prefer kelas_id from form if provided, otherwise fallback to hook's kelasId
      const payload = { ...data, kelas_id: data.kelas_id || kelasId };
      const response = await materiApi.update(id, payload);
      toast.success(response.message || "Materi berhasil diperbarui");
      fetchMateri();
      setIsModalOpen(false);
      setEditingMateri(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal memperbarui materi");
      throw error;
    }
  };

  // Delete materi
  const deleteMateri = async (id) => {
    try {
      const response = await materiApi.delete(id);
      toast.success(response.message || "Materi berhasil dihapus");
      fetchMateri();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menghapus materi");
    }
  };

  // Open modal for create
  const openCreateModal = () => {
    setEditingMateri(null);
    setIsModalOpen(true);
  };

  // Open modal for edit
  const openEditModal = (materi) => {
    setEditingMateri(materi);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMateri(null);
  };

  return {
    materiList,
    loading,
    error,
    isModalOpen,
    editingMateri,
    createMateri,
    updateMateri,
    deleteMateri,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
