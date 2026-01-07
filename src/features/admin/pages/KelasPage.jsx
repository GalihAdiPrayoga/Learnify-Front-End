import { useState, useEffect, useMemo } from "react";
import { useKelas } from "../hooks/useKelas";
import { KelasColumns } from "../config/KelasConfig";
import KelasFormModal from "../form/KelasFormModal";
import Loading from "@/components/Loading";
import NotFound from "@/features/error/notfound";
import toastr from "toastr";
import HeaderCard from "../components/HeaderCard";

// added imports (new components & hook)
import { useKelasForm } from "../hooks/useKelasForm";
import KelasToolbar from "../components/kelas/KelasToolbar";
import KelasTableSection from "../components/kelas/KelasTableSection";

export default function KelasPage() {
  const { kelas, loading, error, createKelas, updateKelas, deleteKelas } =
    useKelas();
  const [showModal, setShowModal] = useState(false);

  // use hook for form & file preview management
  const kelasForm = useKelasForm({ createKelas, updateKelas });

  const [editingKelas, setEditingKelas] = useState(null);
  // keep local editing state in sync with hook when needed
  useEffect(() => {
    if (kelasForm.editingKelas !== editingKelas)
      setEditingKelas(kelasForm.editingKelas);
  }, [kelasForm.editingKelas]);

  // Search & Pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleDelete = async (id) => {
    try {
      await deleteKelas(id);
      toastr.success("Kelas berhasil dihapus");
    } catch (err) {
      toastr.error("Gagal menghapus kelas");
    }
  };

  const resetForm = () => {
    kelasForm.resetForm();
    setEditingKelas(null);
  };

  // Filter dan pagination logic (unchanged)
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

      <KelasToolbar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        onAdd={() => {
          setShowModal(true);
          kelasForm.resetForm();
        }}
      />

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
          <KelasTableSection
            columns={KelasColumns}
            data={tableData}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredKelas.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            onEdit={(row) => {
              kelasForm.handleEdit(row);
              setShowModal(true);
            }}
            onDelete={handleDelete}
          />
        </>
      )}

      <KelasFormModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          kelasForm.resetForm();
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          await kelasForm.handleSubmit(e);
          setShowModal(false);
          kelasForm.resetForm();
        }}
        loading={loading}
        editingKelas={kelasForm.editingKelas}
        formData={kelasForm.formData}
        setFormData={kelasForm.setFormData}
        getPreviewSrc={kelasForm.getPreviewSrc}
        handleFileChange={kelasForm.handleFileChange}
      />
    </div>
  );
}
