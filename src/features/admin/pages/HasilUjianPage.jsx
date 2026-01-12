import { useState, useEffect, useMemo } from "react";
import { useHasilUjian } from "../hooks/useHasilUjian";
import { HasilUjianColumns } from "../config/HasilUjianConfig";
import Loading from "@/components/Loading";
import NotFound from "@/features/error/notfound";
import HeaderCard from "../components/HeaderCard";
import HasilUjianToolbar from "../components/hasilujian/HasilUjianToolbar";
import HasilUjianTableSection from "../components/hasilujian/HasilUjianTableSection";

export default function HasilUjianPage() {
  const { hasilList, loading, error, deleteHasil } = useHasilUjian();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredList = useMemo(() => {
    if (!searchTerm) return hasilList;
    const term = searchTerm.toLowerCase();
    return hasilList.filter((h) => {
      return (
        h.user?.name?.toLowerCase().includes(term) ||
        h.materi?.judul?.toLowerCase().includes(term)
      );
    });
  }, [hasilList, searchTerm]);

  const sortedList = useMemo(() => {
    return (filteredList || []).slice().sort((a, b) => {
      return Number(b?.id ?? 0) - Number(a?.id ?? 0);
    });
  }, [filteredList]);

  const totalPages = Math.ceil(sortedList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayed = sortedList.slice(startIndex, startIndex + itemsPerPage);

  const tableData = (displayed || []).map((row, idx) => ({
    ...row,
    __no: startIndex + idx + 1,
    user_name: row.user?.name || "-",
    materi_judul: row.materi?.judul || "-",
    tanggal: new Date(row.created_at).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  }));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="p-6">
      <HeaderCard
        title="Hasil Ujian Management"
        subtitle="Kelola data hasil ujian siswa"
        showBack={false}
      />

      <HasilUjianToolbar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(val) => {
          setItemsPerPage(val);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <Loading />
      ) : error ? (
        <NotFound
          title="Gagal Memuat Data"
          message={error || "Terjadi kesalahan saat mengambil data hasil ujian"}
          type="error"
          onRetry={() => window.location.reload()}
        />
      ) : (
        <HasilUjianTableSection
          columns={HasilUjianColumns}
          data={tableData}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedList.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => {
            setItemsPerPage(val);
            setCurrentPage(1);
          }}
          onDelete={deleteHasil}
        />
      )}
    </div>
  );
}
