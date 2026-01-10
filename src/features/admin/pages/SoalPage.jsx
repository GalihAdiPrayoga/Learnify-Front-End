import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSoal } from "../hooks/useSoal";
import { SoalColumns } from "../config/SoalConfig";
import Loading from "@/components/Loading";
import NotFound from "@/features/error/notfound";
import toastr from "toastr";
import HeaderCard from "../components/HeaderCard";
import SoalToolbar from "../components/soal/SoalToolbar";
import SoalTableSection from "../components/soal/SoalTableSection";

export default function SoalPage() {
  const navigate = useNavigate();
  const { Soal, loading, error, deleteSoal } = useSoal();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // delete immediately (same behavior as MateriPage)
  const handleDelete = async (id) => {
    try {
      await deleteSoal(id);
      toastr.success("Soal berhasil dihapus");
    } catch (err) {
      toastr.error("Gagal menghapus soal");
    }
  };

  const filteredSoal = useMemo(() => {
    if (!searchTerm) return Soal;
    const term = searchTerm.toLowerCase();
    return Soal.filter((s) => {
      return (
        s.pertanyaan?.toLowerCase().includes(term) ||
        s.materi?.judul?.toLowerCase().includes(term)
      );
    });
  }, [Soal, searchTerm]);

  const displayedSoal = useMemo(() => {
    const sorted = (filteredSoal || []).slice().sort((a, b) => {
      return Number(b?.id ?? 0) - Number(a?.id ?? 0);
    });
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sorted.slice(startIndex, endIndex);
  }, [filteredSoal, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredSoal.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const tableData = (displayedSoal || []).map((row, idx) => ({
    ...row,
    __no: startIndex + idx + 1,
  }));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="p-6">
      <HeaderCard
        title="Soal Management"
        subtitle="Kelola data soal"
        showBack={false}
      />

      <SoalToolbar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(val) => {
          setItemsPerPage(val);
          setCurrentPage(1);
        }}
        onAdd={() => navigate("/admin/soal/new")}
      />

      {loading ? (
        <Loading />
      ) : error ? (
        <NotFound
          title="Gagal Memuat Data"
          message={error || "Terjadi kesalahan saat mengambil data soal"}
          type="error"
          onRetry={() => window.location.reload()}
        />
      ) : (
        <SoalTableSection
          columns={SoalColumns}
          data={tableData}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredSoal.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => {
            setItemsPerPage(val);
            setCurrentPage(1);
          }}
          onEdit={(row) => navigate(`/admin/soal/${row.id}/edit`)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
