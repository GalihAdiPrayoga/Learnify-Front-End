import { useState, useEffect, useCallback } from "react";
import toastr from "toastr";
import { KelasFormFields } from "../config/KelasConfig";
import { STORAGE_URL } from "@/services/api/axios";

export function useKelasForm({ createKelas, updateKelas }) {
  // build empty initial form based on config
  const initialForm = {};
  KelasFormFields.forEach((f) => {
    initialForm[f.key] = f.type === "file" ? null : "";
  });

  const [formData, setFormData] = useState(initialForm);
  const [previews, setPreviews] = useState({});
  const [editingKelas, setEditingKelas] = useState(null);

  const revokePreviews = useCallback(() => {
    Object.values(previews).forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    });
  }, [previews]);

  useEffect(() => {
    return () => revokePreviews();
  }, [revokePreviews]);

  const handleFileChange = (fieldKey, file) => {
    const prev = previews[fieldKey];
    if (prev) {
      try {
        URL.revokeObjectURL(prev);
      } catch {}
    }

    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setPreviews((s) => ({ ...s, [fieldKey]: url }));
      setFormData((s) => ({ ...s, [fieldKey]: file }));
    } else {
      setPreviews((s) => {
        const next = { ...s };
        delete next[fieldKey];
        return next;
      });
      setFormData((s) => ({ ...s, [fieldKey]: null }));
    }
  };

  const getImagePath = (row, key) =>
    row?.[key] ?? row?.thumnail ?? row?.gambar ?? row?.image ?? null;

  const getPreviewSrc = (fieldKey) => {
    if (previews[fieldKey]) return previews[fieldKey];
    const existing = getImagePath(editingKelas, fieldKey);
    if (!existing) return null;
    const base = String(STORAGE_URL || "").replace(/\/+$/, "");
    const path = String(existing).replace(/^\/+/, "");
    return `${base}/${path}`;
  };

  const resetForm = () => {
    revokePreviews();
    setPreviews({});
    setFormData(initialForm);
    setEditingKelas(null);
  };

  const handleEdit = (kelasRow) => {
    revokePreviews();
    setPreviews({});
    const payload = {};
    KelasFormFields.forEach((f) => {
      payload[f.key] = f.type === "file" ? null : kelasRow?.[f.key] ?? "";
    });
    setEditingKelas(kelasRow);
    setFormData(payload);
  };

  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    try {
      if (editingKelas) {
        await updateKelas(editingKelas.id, formData);
        toastr.success("Kelas berhasil diperbarui");
      } else {
        await createKelas(formData);
        toastr.success("Kelas berhasil dibuat");
      }
      return { success: true };
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Terjadi kesalahan";
      toastr.error(msg);
      return { success: false, error: err };
    }
  };

  return {
    formData,
    setFormData,
    previews,
    handleFileChange,
    getPreviewSrc,
    handleSubmit,
    editingKelas,
    setEditingKelas,
    resetForm,
    handleEdit,
  };
}
