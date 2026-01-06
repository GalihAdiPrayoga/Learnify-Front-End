import { useState, useEffect, useMemo } from "react";
import { useKelas } from "../hooks/useKelas";
import DataTables from "../components/DataTables";
import Button from "@/components/button";
import { KelasColumns, KelasFormFields } from "../config/KelasConfig";
import { STORAGE_URL } from "@/services/api/axios";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import KelasFormModal from "../form/KelasFormModal";
import Loading from "@/components/Loading";
import NotFound from "@/features/error/notfound";
import toastr from "toastr";
import HeaderCard from "../components/HeaderCard";
import { SelectField } from "@/components/fields";

export default function KelasPage() {
  const { kelas, loading, error, createKelas, updateKelas, deleteKelas } =
    useKelas();
  const [showModal, setShowModal] = useState(false);
  const [editingKelas, setEditingKelas] = useState(null);

  // Search & Pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // preview URLs untuk file yang dipilih sebelum upload
  const [previews, setPreviews] = useState({});

  // build empty initial form based on config
  const initialForm = {};
  KelasFormFields.forEach((f) => {
    initialForm[f.key] = f.type === "file" ? null : "";
  });

  const [formData, setFormData] = useState(initialForm);

  // helper: revoke all preview object URLs
  const revokePreviews = () => {
    Object.values(previews).forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    });
  };

  useEffect(() => {
    // cleanup saat unmount
    return () => revokePreviews();
  }, []); // only on unmount

  const handleFileChange = (fieldKey, file) => {
    // revoke previous preview untuk field ini
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

  const getPreviewSrc = (fieldKey) => {
    if (previews[fieldKey]) return previews[fieldKey];
    const existing = getImagePath(editingKelas, fieldKey);
    if (!existing) return null;
    const base = String(STORAGE_URL || "").replace(/\/+$/, "");
    const path = String(existing).replace(/^\/+/, "");
    return `${base}/${path}`;
  };

  const getImagePath = (row, key) =>
    row?.[key] ?? row?.thumnail ?? row?.gambar ?? row?.image ?? null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingKelas) {
        await updateKelas(editingKelas.id, formData);
        toastr.success("Kelas berhasil diperbarui");
      } else {
        await createKelas(formData);
        toastr.success("Kelas berhasil dibuat");
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Terjadi kesalahan";
      toastr.error(msg);
    }
  };

  const handleEdit = (kelasRow) => {
    // use helper
    revokePreviews();
    setPreviews({});
    const payload = {};
    KelasFormFields.forEach((f) => {
      payload[f.key] = f.type === "file" ? null : kelasRow?.[f.key] ?? "";
    });
    setEditingKelas(kelasRow);
    setFormData(payload);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteKelas(id);
      toastr.success("Kelas berhasil dihapus");
    } catch (err) {
      toastr.error("Gagal menghapus kelas");
    }
  };

  const resetForm = () => {
    revokePreviews();
    setPreviews({});
    setFormData(initialForm);
    setEditingKelas(null);
  };

  // Filter dan pagination logic
  const filteredKelas = useMemo(() => {
    if (!searchTerm) return kelas;

    const term = searchTerm.toLowerCase();
    return kelas.filter((k) => {
      return (
        k.nama?.toLowerCase().includes(term) ||
        k.deskripsi?.toLowerCase().includes(term) ||
        k.kode?.toLowerCase().includes(term)
      );
    });
  }, [kelas, searchTerm]);

  const displayedKelas = useMemo(() => {
    // sort by id desc (newest first) then paginate
    const sorted = (filteredKelas || []).slice().sort((a, b) => {
      return Number(b?.id ?? 0) - Number(a?.id ?? 0);
    });
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sorted.slice(startIndex, endIndex);
  }, [filteredKelas, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredKelas.length / itemsPerPage);

  // prepare table data with row numbers
  const startIndex = (currentPage - 1) * itemsPerPage;
  const tableData = (displayedKelas || []).map((row, idx) => ({
    ...row,
    __no: startIndex + idx + 1,
  }));

  // Reset ke halaman 1 ketika search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <HeaderCard
        title="Classes Management"
        subtitle="Kelola data kelas"
        showBack={false}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 min-h-12">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Cari kelas berdasarkan nama, deskripsi, atau kode..."
            className="h-12 w-full sm:w-72"
          />
          <div className="w-28">
            <SelectField
              options={[5, 10, 15, 20, 25, 50].map((n) => ({
                value: n,
                label: String(n),
              }))}
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="h-12"
            />
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setShowModal(true);
            resetForm();
          }}
          className="h-12 px-4 sm:w-auto w-full"
        >
          Tambah Kelas
        </Button>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <NotFound
          title="Gagal Memuat Data"
          message={
            error ||
            "Terjadi kesalahan saat mengambil data kelas. Silakan coba lagi."
          }
          type="error"
          onRetry={() => window.location.reload()}
        />
      ) : (
        <>
          <DataTables
            columns={KelasColumns}
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredKelas.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}

      <KelasFormModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        loading={loading}
        editingKelas={editingKelas}
        formData={formData}
        setFormData={setFormData}
        getPreviewSrc={getPreviewSrc}
        handleFileChange={handleFileChange}
      />
    </div>
  );
}
